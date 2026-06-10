import { initDb, getAllLeads } from '@/lib/db';

type Props = { searchParams: Promise<{ p?: string }> };

export default async function AdminPage({ searchParams }: Props) {
  const { p } = await searchParams;
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin123';

  if (p !== adminPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form method="GET" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
          <h1 className="font-heading text-xl font-bold text-stone-900 mb-6">Admin Access</h1>
          <input
            name="p"
            type="password"
            placeholder="Password"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm mb-4 focus:outline-none focus:border-blue-800"
          />
          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-900 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  await initDb();
  const leads = await getAllLeads();

  const scoreColors: Record<string, string> = {
    hot: 'bg-red-100 text-red-700',
    warm: 'bg-orange-100 text-orange-700',
    cold: 'bg-blue-50 text-blue-700',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-heading text-2xl font-bold text-stone-900 mb-2">Leads Dashboard</h1>
        <p className="text-gray-500 text-sm mb-8">{leads.length} total leads</p>

        <div className="space-y-3">
          {leads.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-400">
              No leads yet.
            </div>
          )}
          {leads.map((lead: any) => (
            <div key={lead.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${scoreColors[lead.score] ?? 'bg-gray-100 text-gray-600'}`}>
                      {lead.score === 'hot' ? '🔥' : lead.score === 'warm' ? '🌡️' : '❄️'} {lead.score}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(lead.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="font-medium text-stone-900">{lead.name} <span className="font-normal text-gray-500">· {lead.email}</span></p>
                  {lead.budget && <p className="text-sm text-gray-500 mt-0.5">Budget: {lead.budget}</p>}
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{lead.message}</p>
                  {lead.reasoning && <p className="text-xs text-gray-400 mt-1 italic">AI: {lead.reasoning}</p>}
                </div>
                <a
                  href={`mailto:${lead.email}`}
                  className="shrink-0 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-stone-700 transition-colors"
                >
                  Reply
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
