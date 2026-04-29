import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  MapPin,
  Calendar,
  FileText,
  BookOpen,
  ClipboardList,
  MessageSquare,
} from "lucide-react";
import { requireRole } from "@/lib/auth";
import { ROLES, KANBAN_STAGE_LABELS, APPLICATION_STATUS_LABELS, SECTION_LABELS } from "@/lib/constants";
import { getStudentDetail } from "@/actions/counselor";
import DashboardPanel from "@/components/dashboard/shared/DashboardPanel";
import DashboardStatusBadge from "@/components/dashboard/shared/DashboardStatusBadge";
import DocumentStatusUpdater from "@/components/counselor/DocumentStatusUpdater";
import AddNoteForm from "@/components/counselor/AddNoteForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function StudentDetailPage({ params }: Props) {
  await requireRole([ROLES.COUNSELOR]);
  const { id } = await params;

  const result = await getStudentDetail(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const { data: student } = result;
  const { application, documents, notes, requirements } = student;
  const requirementStatusMap = new Map(requirements?.map((r: any) => [r.id, r.status]) ?? []);

  // Sections no longer exist in the new Application schema

  return (
    <div className="space-y-8">
      {/* Back nav */}
      <Link
        href="/counselor/students"
        className="inline-flex items-center gap-1.5 font-inter text-sm text-slate-500 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to My Students
      </Link>

      {/* Page header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-poppins text-3xl font-semibold tracking-tight text-slate-900">
            {student.user.name}
          </h1>
          <p className="font-inter text-sm text-slate-500">{student.user.email}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DashboardStatusBadge
            status={KANBAN_STAGE_LABELS[student.kanbanStage] ?? student.kanbanStage}
          />
          {application && (
            <DashboardStatusBadge
              status={APPLICATION_STATUS_LABELS[application.status] ?? application.status}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_380px]">
        {/* Left column */}
        <div className="space-y-6">
          {/* Profile info */}
          <DashboardPanel title="Student Profile" description="Personal and contact information">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoRow icon={User} label="Full Name" value={student.user.name} />
              <InfoRow icon={MessageSquare} label="Email" value={student.user.email} />
              {student.nationality && (
                <InfoRow icon={MapPin} label="Nationality" value={student.nationality} />
              )}
              {student.dateOfBirth && (
                <InfoRow
                  icon={Calendar}
                  label="Date of Birth"
                  value={new Date(student.dateOfBirth).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                />
              )}
              {student.phone && <InfoRow icon={MessageSquare} label="Phone" value={student.phone} />}
              {student.address && (
                <InfoRow icon={MapPin} label="Address" value={student.address} />
              )}
              {student.passportNo && (
                <InfoRow icon={FileText} label="Passport No." value={student.passportNo} />
              )}
              <InfoRow
                icon={Calendar}
                label="Joined"
                value={new Date(student.user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              />
            </div>
          </DashboardPanel>

          {/* Application progress */}
          <DashboardPanel
            title="Application Progress"
            description={application ? APPLICATION_STATUS_LABELS[application.status] : "No application started"}
          >
            {!application ? (
              <p className="font-inter text-sm text-slate-400">No application started yet.</p>
            ) : (
              <div className="space-y-4">
                {/* Program info */}
                {(application.degreeProgram || application.targetUniversity) && (
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-2">
                    {application.degreeProgram && (
                      <InfoRow icon={BookOpen} label="Program" value={application.degreeProgram} />
                    )}
                    {application.targetUniversity && (
                      <InfoRow
                        icon={ClipboardList}
                        label="University"
                        value={application.targetUniversity}
                      />
                    )}
                    {application.startTerm && application.targetYear && (
                      <InfoRow
                        icon={Calendar}
                        label="Intake"
                        value={`${application.startTerm} ${application.targetYear}`}
                      />
                    )}
                    {application.submittedAt && (
                      <InfoRow
                        icon={Calendar}
                        label="Submitted"
                        value={new Date(application.submittedAt).toLocaleDateString()}
                      />
                    )}
                  </div>
                )}

                <DashboardStatusBadge status={application.status.replaceAll("_", " ")} />
              </div>
            )}
          </DashboardPanel>

          {/* Documents */}
          <DashboardPanel
            title="Documents"
            description={`${documents.length} document${documents.length !== 1 ? "s" : ""} uploaded`}
          >
            {documents.length === 0 ? (
              <p className="font-inter text-sm text-slate-400">No documents uploaded yet.</p>
            ) : (
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 px-4 py-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-inter text-sm font-medium text-slate-800">
                        {doc.name}
                      </p>
                      <p className="font-inter text-[11px] text-slate-400">{doc.type}</p>
                    </div>
                    <DocumentStatusUpdater
                      documentId={doc.id}
                      currentStatus={requirementStatusMap.get(doc.requirementId) ?? "PENDING"}
                      documentName={doc.name}
                    />
                  </div>
                ))}
              </div>
            )}
          </DashboardPanel>
        </div>

        {/* Right column — Notes */}
        <div className="space-y-6">
          <DashboardPanel
            title="Counselor Notes"
            description="Private notes visible only to you"
          >
            <div className="space-y-4">
              <AddNoteForm studentProfileId={id} />

              {notes.length > 0 && (
                <div className="space-y-3 pt-2">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <DashboardStatusBadge status={note.stage.replace(/_/g, " ")} />
                        <span className="font-inter text-[10px] text-slate-400">
                          {new Date(note.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="font-inter text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                        {note.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {notes.length === 0 && (
                <p className="font-inter text-xs text-slate-400">
                  No notes yet. Add your first note above.
                </p>
              )}
            </div>
          </DashboardPanel>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
      <div className="min-w-0">
        <p className="font-inter text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <p className="mt-0.5 font-inter text-sm text-slate-800 break-words">{value}</p>
      </div>
    </div>
  );
}
