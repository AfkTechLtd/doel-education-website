// import { NextResponse } from "next/server";
// import { getUser } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";
// import type { SectionNumber } from "@prisma/client";

// // --- GET: Fetch Application Progress & Data ---
// export async function GET() {
//   try {
//     const user = await getUser();
//     if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const studentProfile = await prisma.studentProfile.findUnique({
//       where: { userId: user.id },
//     });

//     if (!studentProfile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

//     const application = await prisma.application.findUnique({
//       where: { studentId: studentProfile.id },
//       include: {
//         sections: true,
//         student: { include: { user: true } }
//       },
//     });

//     if (!application) {
//       return NextResponse.json({ application: null, status: "NOT_STARTED" });
//     }

//     return NextResponse.json({ application });
//   } catch (error) {
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// // --- PATCH: Save Progress (Upsert) ---
// export async function PATCH(req: Request) {
//   try {
//     const user = await getUser();
//     const { step, data } = await req.json();
//     if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const studentProfile = await prisma.studentProfile.findUnique({
//       where: { userId: user.id },
//     });

//     if (!studentProfile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

//     const application = await prisma.application.upsert({
//       where: { studentId: studentProfile.id },
//       update: { updatedAt: new Date() },
//       create: { studentId: studentProfile.id, status: "IN_PROGRESS" },
//     });

//     const sectionMap: Record<number, SectionNumber> = {
//       1: "SECTION_1", 2: "SECTION_2", 3: "SECTION_3", 4: "SECTION_4"
//     };

//     await prisma.applicationSection.upsert({
//       where: {
//         applicationId_sectionNumber: {
//           applicationId: application.id,
//           sectionNumber: sectionMap[step],
//         }
//       },
//       update: { data, isComplete: true },
//       create: {
//         applicationId: application.id,
//         sectionNumber: sectionMap[step],
//         data,
//         isComplete: true
//       }
//     });
//     await prisma.application.update({
//       where: { id: application.id },
//       data: { completedSections: step }
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ error: "Update failed" }, { status: 500 });
//   }
// }

// // --- POST: Final Submission ---
// export async function POST() {
//   try {
//     const user = await getUser();
//     if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const studentProfile = await prisma.studentProfile.findUnique({
//       where: { userId: user.id },
//     });

//     if (!studentProfile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

//     await prisma.application.update({
//       where: { studentId: studentProfile.id },
//       data: {
//         status: "UNDER_REVIEW",
//         submittedAt: new Date()
//       }
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ error: "Submission failed" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Helper parsers for strict DB types
const parseDate = (val?: string) => val ? new Date(val) : undefined;
const parseNum = (val?: string) => val ? Number(val) : undefined;
const parseBool = (val?: string) => val === "true";
const parseStr = (val?: string) => val === "" ? null : (val !== undefined ? val : undefined);
export async function GET() {
  try {
    const user = await getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: user.id },
    });

    if (!studentProfile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    // Fetch the Hub and ALL nested modules
    const application = await prisma.application.findUnique({
      where: { studentId: studentProfile.id },
      include: {
        personalInfo: true,
        academicRecord: true,
        testScores: true,
        financialStanding: true,
        extracurriculars: true,
        familyInfo: true,
        supplemental: true,
        conductAgreement: true,
        recommenders: true, // 1:M relation
      },
    });

    if (!application) {
      return NextResponse.json({ application: null, status: "NOT_STARTED" });
    }

    return NextResponse.json({ application });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getUser();
    const { step, data } = await req.json();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: user.id },
    });

    if (!studentProfile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    // 1. Ensure the base Application exists
    const application = await prisma.application.upsert({
      where: { studentId: studentProfile.id },
      update: { updatedAt: new Date() },
      create: { studentId: studentProfile.id, status: "IN_PROGRESS" },
    });

    // 2. Build the nested payload based on all the data present
    // 2. Build the nested payload based on all the data present
    await prisma.application.update({
      where: { id: application.id },
      data: {
        // Hub Fields
        targetUniversity: parseStr(data.targetUniversity),
        degreeProgram: parseStr(data.degreeProgram),
        startTerm: parseStr(data.startTerm),
        targetYear: parseNum(data.targetYear),

        // Module: Personal Info
        personalInfo: {
          upsert: {
            create: { name: parseStr(data.name), email: parseStr(data.email), dateOfBirth: parseDate(data.dateOfBirth), phone: parseStr(data.phone), nationality: parseStr(data.nationality), gender: parseStr(data.gender), address: parseStr(data.address) },
            update: { name: parseStr(data.name), email: parseStr(data.email), dateOfBirth: parseDate(data.dateOfBirth), phone: parseStr(data.phone), nationality: parseStr(data.nationality), gender: parseStr(data.gender), address: parseStr(data.address) }
          }
        },

        // Module: Academic Record
        academicRecord: {
          upsert: {
            create: { schoolName: parseStr(data.schoolName), schoolCity: parseStr(data.schoolCity), schoolCountry: parseStr(data.schoolCountry), degreeObtained: parseStr(data.degreeObtained), graduationDate: parseDate(data.graduationDate), fieldOfStudy: parseStr(data.fieldOfStudy), gpa: parseNum(data.gpa) },
            update: { schoolName: parseStr(data.schoolName), schoolCity: parseStr(data.schoolCity), schoolCountry: parseStr(data.schoolCountry), degreeObtained: parseStr(data.degreeObtained), graduationDate: parseDate(data.graduationDate), fieldOfStudy: parseStr(data.fieldOfStudy), gpa: parseNum(data.gpa) }
          }
        },

        // Module: Test Scores (These are mostly numbers/booleans, so they stay the same)
        testScores: {
          upsert: {
            create: { requiresSAT: parseBool(data.requiresSAT), requiresACT: parseBool(data.requiresACT), requiresTOEFL: parseBool(data.requiresTOEFL), requiresIELTS: parseBool(data.requiresIELTS), requiresGRE: parseBool(data.requiresGRE), requiresGMAT: parseBool(data.requiresGMAT), satMath: parseNum(data.satMath), satReading: parseNum(data.satReading), actComposite: parseNum(data.actComposite), toeflScore: parseNum(data.toeflScore), ieltsScore: parseNum(data.ieltsScore), greVerbal: parseNum(data.greVerbal), greQuantitative: parseNum(data.greQuantitative), gmatScore: parseNum(data.gmatScore), testDate: parseDate(data.testDate) },
            update: { requiresSAT: parseBool(data.requiresSAT), requiresACT: parseBool(data.requiresACT), requiresTOEFL: parseBool(data.requiresTOEFL), requiresIELTS: parseBool(data.requiresIELTS), requiresGRE: parseBool(data.requiresGRE), requiresGMAT: parseBool(data.requiresGMAT), satMath: parseNum(data.satMath), satReading: parseNum(data.satReading), actComposite: parseNum(data.actComposite), toeflScore: parseNum(data.toeflScore), ieltsScore: parseNum(data.ieltsScore), greVerbal: parseNum(data.greVerbal), greQuantitative: parseNum(data.greQuantitative), gmatScore: parseNum(data.gmatScore), testDate: parseDate(data.testDate) }
          }
        },

        // Module: Financial Standing
        financialStanding: {
          upsert: {
            create: { sponsorFullName: parseStr(data.sponsorFullName), sponsorRelationship: parseStr(data.sponsorRelationship), sponsorOccupation: parseStr(data.sponsorOccupation), sponsorAnnualIncome: parseNum(data.sponsorAnnualIncome), bankBalance: parseNum(data.bankBalance), primaryCurrency: parseStr(data.primaryCurrency), fixedDepositAmount: parseNum(data.fixedDepositAmount), investmentAssets: parseNum(data.investmentAssets), realEstateValue: parseNum(data.realEstateValue), businessAssets: parseNum(data.businessAssets), otherAssets: parseNum(data.otherAssets), totalLiabilities: parseNum(data.totalLiabilities), fundsAvailableForStudy: parseNum(data.fundsAvailableForStudy), fundingSource: parseStr(data.fundingSource), annualTuitionBudget: parseNum(data.annualTuitionBudget), annualLivingBudget: parseNum(data.annualLivingBudget), applyingForScholarship: parseBool(data.applyingForScholarship), scholarshipType: parseStr(data.scholarshipType), financialAidRequired: parseBool(data.financialAidRequired), hasBankStatement: parseBool(data.hasBankStatement), hasSolvencyLetter: parseBool(data.hasSolvencyLetter), hasIncomeTaxReturn: parseBool(data.hasIncomeTaxReturn), hasPropertyDocuments: parseBool(data.hasPropertyDocuments), hasSponsorLetter: parseBool(data.hasSponsorLetter), hasLoanApprovalLetter: parseBool(data.hasLoanApprovalLetter), financialNotes: parseStr(data.financialNotes) },
            update: { sponsorFullName: parseStr(data.sponsorFullName), sponsorRelationship: parseStr(data.sponsorRelationship), sponsorOccupation: parseStr(data.sponsorOccupation), sponsorAnnualIncome: parseNum(data.sponsorAnnualIncome), bankBalance: parseNum(data.bankBalance), primaryCurrency: parseStr(data.primaryCurrency), fixedDepositAmount: parseNum(data.fixedDepositAmount), investmentAssets: parseNum(data.investmentAssets), realEstateValue: parseNum(data.realEstateValue), businessAssets: parseNum(data.businessAssets), otherAssets: parseNum(data.otherAssets), totalLiabilities: parseNum(data.totalLiabilities), fundsAvailableForStudy: parseNum(data.fundsAvailableForStudy), fundingSource: parseStr(data.fundingSource), annualTuitionBudget: parseNum(data.annualTuitionBudget), annualLivingBudget: parseNum(data.annualLivingBudget), applyingForScholarship: parseBool(data.applyingForScholarship), scholarshipType: parseStr(data.scholarshipType), financialAidRequired: parseBool(data.financialAidRequired), hasBankStatement: parseBool(data.hasBankStatement), hasSolvencyLetter: parseBool(data.hasSolvencyLetter), hasIncomeTaxReturn: parseBool(data.hasIncomeTaxReturn), hasPropertyDocuments: parseBool(data.hasPropertyDocuments), hasSponsorLetter: parseBool(data.hasSponsorLetter), hasLoanApprovalLetter: parseBool(data.hasLoanApprovalLetter), financialNotes: parseStr(data.financialNotes) }
          }
        },

        // Module: Extracurriculars
        extracurriculars: {
          upsert: {
            create: { activities: parseStr(data.activities), leadershipRoles: parseStr(data.leadershipRoles), awardsHonors: parseStr(data.awardsHonors), communityService: parseStr(data.communityService) },
            update: { activities: parseStr(data.activities), leadershipRoles: parseStr(data.leadershipRoles), awardsHonors: parseStr(data.awardsHonors), communityService: parseStr(data.communityService) }
          }
        },

        // Module: Family Info
        familyInfo: {
          upsert: {
            create: { fatherName: parseStr(data.fatherName), fatherOccupation: parseStr(data.fatherOccupation), fatherEducation: parseStr(data.fatherEducation), motherName: parseStr(data.motherName), motherOccupation: parseStr(data.motherOccupation), motherEducation: parseStr(data.motherEducation), guardianName: parseStr(data.guardianName), guardianPhone: parseStr(data.guardianPhone), guardianRelationship: parseStr(data.guardianRelationship) },
            update: { fatherName: parseStr(data.fatherName), fatherOccupation: parseStr(data.fatherOccupation), fatherEducation: parseStr(data.fatherEducation), motherName: parseStr(data.motherName), motherOccupation: parseStr(data.motherOccupation), motherEducation: parseStr(data.motherEducation), guardianName: parseStr(data.guardianName), guardianPhone: parseStr(data.guardianPhone), guardianRelationship: parseStr(data.guardianRelationship) }
          }
        },

        // Module: Supplemental / Essays
        supplemental: {
          upsert: {
            create: { personalStatement: parseStr(data.personalStatement), whyThisUniversity: parseStr(data.whyThisUniversity), whyThisProgram: parseStr(data.whyThisProgram), hearAboutUs: parseStr(data.hearAboutUs), additionalInfo: parseStr(data.additionalInfo), requirementNotes: parseStr(data.requirementNotes) },
            update: { personalStatement: parseStr(data.personalStatement), whyThisUniversity: parseStr(data.whyThisUniversity), whyThisProgram: parseStr(data.whyThisProgram), hearAboutUs: parseStr(data.hearAboutUs), additionalInfo: parseStr(data.additionalInfo), requirementNotes: parseStr(data.requirementNotes) }
          }
        },

        // Module: Conduct Agreement
        conductAgreement: {
          upsert: {
            create: { hasCriminalRecord: parseBool(data.hasCriminalRecord), hasAcademicViolation: parseBool(data.hasAcademicViolation), hasDisciplinaryAction: parseBool(data.hasDisciplinaryAction), conductExplanation: parseStr(data.conductExplanation), agreeToConduct: parseBool(data.agreeToConduct), agreeToTerms: parseBool(data.agreeToTerms), agreeToAccuracy: parseBool(data.agreeToAccuracy), signature: parseStr(data.signature) },
            update: { hasCriminalRecord: parseBool(data.hasCriminalRecord), hasAcademicViolation: parseBool(data.hasAcademicViolation), hasDisciplinaryAction: parseBool(data.hasDisciplinaryAction), conductExplanation: parseStr(data.conductExplanation), agreeToConduct: parseBool(data.agreeToConduct), agreeToTerms: parseBool(data.agreeToTerms), agreeToAccuracy: parseBool(data.agreeToAccuracy), signature: parseStr(data.signature) }
          }
        }
      }

    });

    // 3. Handle Recommenders Array (1:M)
    if (step === 3) {
      // Clear existing to prevent duplicates on edit, then recreate
      await prisma.appRecommender.deleteMany({ where: { applicationId: application.id } });

      const recommendersToCreate = [];
      const reqCount = parseNum(data.recommendationsRequired) || 0;

      for (let i = 1; i <= reqCount; i++) {
        if (data[`rec${i}Name`] && data[`rec${i}Email`]) {
          recommendersToCreate.push({
            applicationId: application.id,
            name: data[`rec${i}Name`],
            email: data[`rec${i}Email`],
            title: data[`rec${i}Title`] || null,
            institution: data[`rec${i}Institution`] || null,
          });
        }
      }

      if (recommendersToCreate.length > 0) {
        await prisma.appRecommender.createMany({ data: recommendersToCreate });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// --- POST: Final Submission ---
export async function POST() {
  try {
    const user = await getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: user.id },
    });

    if (!studentProfile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    await prisma.application.update({
      where: { studentId: studentProfile.id },
      data: {
        status: "UNDER_REVIEW",
        submittedAt: new Date()
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
