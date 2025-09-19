'use client';

import { RequestRest } from '@/types/rest.type';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getStatusColor } from '@/utils/restTransform';
import { getMethodColor } from '@/utils/colors';

type ResponseRest = RequestRest & { id: string };

interface HistoryAnalyticsProps {
  data: ResponseRest[];
}

function HistoryAnalytics({ data }: HistoryAnalyticsProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-center">History Requests</h1>
      <Table className="border border-gray-200 rounded-md text-sm font-mono">
        <TableHeader>
          <TableRow className="bg-muted/40 border-b">
            <TableHead className="px-3 py-2">Method</TableHead>
            <TableHead className="px-3 py-2">Endpoint/URL</TableHead>
            <TableHead className="px-3 py-2">Status</TableHead>
            <TableHead className="px-3 py-2">Request Duration</TableHead>
            <TableHead className="px-3 py-2">Request Size</TableHead>
            <TableHead className="px-3 py-2">Response Size</TableHead>
            <TableHead className="px-3 py-2 w-[220px] whitespace-nowrap">
              Error Details
            </TableHead>
            <TableHead className="px-3 py-2">Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((req) => (
            <TableRow
              key={req.id}
              className="hover:bg-muted/30 transition-colors divide-x"
            >
              <TableCell className="px-3 py-2 text-xs font-semibold">
                <span
                  className={`px-2 py-0.5 rounded border ${getMethodColor(
                    req.request_method
                  )}`}
                >
                  {req.request_method}
                </span>
              </TableCell>

              <TableCell className="px-3 py-2 truncate max-w-xs">
                <Link
                  href={`/rest${req.route}`}
                  className="text-blue-600 hover:underline"
                >
                  {req.endpoint_url}
                </Link>
              </TableCell>

              <TableCell className="px-3 py-2">
                <span
                  className={`px-2 py-0.5 rounded border ${getStatusColor(
                    req.response_status
                  )}`}
                >
                  {req.response_status ?? '-'}
                </span>
              </TableCell>

              <TableCell className="px-3 py-2 text-right">
                {req.request_duration ?? '-'}
              </TableCell>
              <TableCell className="px-3 py-2 text-right">
                {req.request_size ?? '-'}
              </TableCell>
              <TableCell className="px-3 py-2 text-right">
                {req.response_size ?? '-'}
              </TableCell>

              <TableCell className="px-3 py-2 text-red-500 truncate max-w-[220px]">
                {req.error_details ?? ''}
              </TableCell>

              <TableCell className="px-3 py-2 text-xs text-muted-foreground whitespace-nowrap">
                {new Date(req.created_at).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default HistoryAnalytics;
