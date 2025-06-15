import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InlineEditor } from '../components/InlineEditor';

describe('InlineEditor', () => {
  const defaultProps = {
    value: 'Test content',
    onChange: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with initial value', () => {
    render(<InlineEditor {...defaultProps} />);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('shows placeholder when value is empty', () => {
    render(<InlineEditor value="" onChange={jest.fn()} placeholder="Click to edit" />);
    expect(screen.getByText('Click to edit')).toBeInTheDocument();
  });

  it('enters edit mode when clicked', async () => {
    const user = userEvent.setup();
    render(<InlineEditor {...defaultProps} />);
    
    const editor = screen.getByText('Test content');
    await user.click(editor);
    
    expect(editor).toHaveAttribute('contenteditable', 'true');
    expect(editor).toHaveClass('inline-editor--editing');
  });

  it('does not enter edit mode when readOnly is true', async () => {
    const user = userEvent.setup();
    render(<InlineEditor {...defaultProps} readOnly />);
    
    const editor = screen.getByText('Test content');
    await user.click(editor);
    
    expect(editor).not.toHaveAttribute('contenteditable');
    expect(editor).toHaveClass('inline-editor--readonly');
  });

  it('calls onEditStart when editing begins', async () => {
    const onEditStart = jest.fn();
    const user = userEvent.setup();
    render(<InlineEditor {...defaultProps} onEditStart={onEditStart} />);
    
    await user.click(screen.getByText('Test content'));
    expect(onEditStart).toHaveBeenCalledTimes(1);
  });

  it('saves changes on Enter key', async () => {
    const onChange = jest.fn();
    const onEditComplete = jest.fn();
    const user = userEvent.setup();
    
    render(<InlineEditor value="Initial" onChange={onChange} onEditComplete={onEditComplete} />);
    
    const editor = screen.getByText('Initial');
    await user.click(editor);
    
    // Clear and type new content
    await user.clear(editor);
    await user.type(editor, 'Updated content');
    await user.keyboard('{Enter}');
    
    expect(onChange).toHaveBeenCalledWith('Updated content');
    expect(onEditComplete).toHaveBeenCalledWith('Updated content');
  });

  it('cancels changes on Escape key', async () => {
    const onChange = jest.fn();
    const onEditCancel = jest.fn();
    const user = userEvent.setup();
    
    render(<InlineEditor value="Initial" onChange={onChange} onEditCancel={onEditCancel} />);
    
    const editor = screen.getByText('Initial');
    await user.click(editor);
    await user.type(editor, ' modified');
    await user.keyboard('{Escape}');
    
    expect(onChange).not.toHaveBeenCalled();
    expect(onEditCancel).toHaveBeenCalledTimes(1);
    expect(editor).toHaveTextContent('Initial');
  });

  it('supports custom keyboard shortcuts', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    
    render(
      <InlineEditor 
        value="Initial" 
        onChange={onChange} 
        keyboardShortcuts={{ save: ['Tab'], cancel: ['Delete'] }}
      />
    );
    
    const editor = screen.getByText('Initial');
    await user.click(editor);
    await user.type(editor, ' updated');
    await user.keyboard('{Tab}');
    
    expect(onChange).toHaveBeenCalledWith('Initial updated');
  });

  it('shows validation error', async () => {
    const validate = (value: string) => value.length < 3 ? 'Too short' : null;
    const user = userEvent.setup();
    
    render(<InlineEditor value="Hi" onChange={jest.fn()} validate={validate} />);
    
    const editor = screen.getByText('Hi');
    await user.click(editor);
    
    await waitFor(() => {
      expect(screen.getByText('Too short')).toBeInTheDocument();
    });
  });

  it('respects maxLength', async () => {
    const user = userEvent.setup();
    render(<InlineEditor value="" onChange={jest.fn()} maxLength={5} />);
    
    const editor = screen.getByText('Click to edit...');
    await user.click(editor);
    await user.type(editor, '123456789');
    
    await waitFor(() => {
      expect(screen.getByText('Maximum 5 characters allowed')).toBeInTheDocument();
    });
  });

  it('disables editing when disabled prop is true', async () => {
    const user = userEvent.setup();
    render(<InlineEditor {...defaultProps} disabled />);
    
    const editor = screen.getByText('Test content');
    await user.click(editor);
    
    expect(editor).not.toHaveAttribute('contenteditable');
    expect(editor).toHaveClass('inline-editor--disabled');
  });

  it('shows character counter when editing with maxLength', async () => {
    const user = userEvent.setup();
    render(<InlineEditor value="Hello" onChange={jest.fn()} maxLength={10} />);
    
    const editor = screen.getByText('Hello');
    await user.click(editor);
    
    expect(screen.getByText('5/10')).toBeInTheDocument();
  });

  it('handles multiline mode correctly', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    
    render(<InlineEditor value="Line 1" onChange={onChange} multiline />);
    
    const editor = screen.getByText('Line 1');
    await user.click(editor);
    await user.type(editor, '{Enter}Line 2');
    
    // In multiline mode, Enter should not save immediately
    expect(onChange).not.toHaveBeenCalled();
    
    // Ctrl+Enter should save
    await user.keyboard('{Control>}{Enter}{/Control}');
    expect(onChange).toHaveBeenCalled();
  });

  it('handles paste events correctly for single-line mode', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    
    render(<InlineEditor value="" onChange={onChange} multiline={false} />);
    
    const editor = screen.getByText('Click to edit...');
    await user.click(editor);
    
    // Simulate paste with newlines
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer()
    });
    pasteEvent.clipboardData?.setData('text/plain', 'Line 1\nLine 2\nLine 3');
    
    fireEvent(editor, pasteEvent);
    
    // Should strip newlines in single-line mode
    expect(editor.textContent).toBe('Line 1 Line 2 Line 3');
  });

  it('auto-saves after delay', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    
    render(<InlineEditor value="Initial" onChange={onChange} autoSaveDelay={100} />);
    
    const editor = screen.getByText('Initial');
    await user.click(editor);
    await user.type(editor, ' updated');
    
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('Initial updated');
    }, { timeout: 200 });
  });

  it('does not auto-save when there are validation errors', async () => {
    const onChange = jest.fn();
    const validate = (value: string) => value.length < 3 ? 'Too short' : null;
    const user = userEvent.setup();
    
    render(<InlineEditor value="Hi" onChange={onChange} validate={validate} autoSaveDelay={100} />);
    
    const editor = screen.getByText('Hi');
    await user.click(editor);
    await user.type(editor, 'x'); // Still too short
    
    // Wait longer than auto-save delay
    await new Promise(resolve => setTimeout(resolve, 150));
    
    expect(onChange).not.toHaveBeenCalled();
  });

  it('exposes methods via ref', () => {
    const ref = React.createRef<any>();
    render(<InlineEditor {...defaultProps} ref={ref} />);
    
    expect(ref.current).toHaveProperty('startEditing');
    expect(ref.current).toHaveProperty('stopEditing');
    expect(ref.current).toHaveProperty('getValue');
    expect(ref.current).toHaveProperty('isEditing');
  });

  it('shows edit indicator when not editing and not disabled', () => {
    render(<InlineEditor {...defaultProps} showEditIndicator />);
    expect(screen.getByText('✏️')).toBeInTheDocument();
  });

  it('shows custom edit indicator', () => {
    render(<InlineEditor {...defaultProps} editIndicator="📝" />);
    expect(screen.getByText('📝')).toBeInTheDocument();
  });

  it('does not show edit indicator when disabled', () => {
    render(<InlineEditor {...defaultProps} disabled showEditIndicator />);
    expect(screen.queryByText('✏️')).not.toBeInTheDocument();
  });

  it('prevents blur when clicking action buttons', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    
    render(<InlineEditor value="Initial" onChange={onChange} />);
    
    const editor = screen.getByText('Initial');
    await user.click(editor);
    await user.type(editor, ' updated');
    
    // Click save button
    const saveButton = screen.getByLabelText('Save changes');
    await user.click(saveButton);
    
    expect(onChange).toHaveBeenCalledWith('Initial updated');
  });
});