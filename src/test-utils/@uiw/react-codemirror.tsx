import React from 'react';

interface CodeMirrorProps {
  value?: string;
  onChange?: (value: string) => void;
  height?: string;
  extensions?: unknown[];
  [key: string]: unknown;
}

const CodeMirror = React.forwardRef<HTMLTextAreaElement, CodeMirrorProps>(
  ({ value = '', onChange, height = '200px', ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (typeof onChange === 'function') {
        onChange(event.target.value);
      }
    };

    return (
      <textarea
        data-testid="codemirror-mock"
        ref={ref}
        value={value as string}
        onChange={handleChange}
        style={{ height: height as string }}
        {...props}
      />
    );
  }
);

CodeMirror.displayName = 'CodeMirror';

export default CodeMirror;
