import { render, screen } from '@/test-utils';
import HistoryAnalytics from '../history/HistoryAnalytics';
import { describe, it, expect } from 'vitest';
import { mockDataResponse } from '@/test-utils/mockData';

describe('HistoryAnalytics component', () => {
  it('renders table headers', () => {
    render(<HistoryAnalytics data={mockDataResponse} />);

    expect(screen.getByText('History Requests')).toBeInTheDocument();
    expect(screen.getByText('Method')).toBeInTheDocument();
    expect(screen.getByText('Endpoint/URL')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Request Duration')).toBeInTheDocument();
    expect(screen.getByText('Request Size')).toBeInTheDocument();
    expect(screen.getByText('Response Size')).toBeInTheDocument();
    expect(screen.getByText('Error Details')).toBeInTheDocument();
    expect(screen.getByText('Timestamp')).toBeInTheDocument();
  });

  it('renders data rows correctly', () => {
    render(<HistoryAnalytics data={mockDataResponse} />);

    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('POST')).toBeInTheDocument();

    expect(
      screen.getAllByRole('link', {
        name: /https:\/\/jsonplaceholder\.typicode\.com\/posts/i,
      })[0]
    ).toBeInTheDocument();

    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();

    expect(screen.getByText('Internal Server Error')).toBeInTheDocument();

    expect(
      screen.getByText(
        new Date(mockDataResponse[0].created_at).toLocaleString()
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        new Date(mockDataResponse[1].created_at).toLocaleString()
      )
    ).toBeInTheDocument();
  });
});
