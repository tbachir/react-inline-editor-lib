import { renderHook, act } from '@testing-library/react';
import { useInlineEditor } from '../hooks/useInlineEditor';

describe('useInlineEditor', () => {
  const defaultOptions = {
    value: 'Test value',
    onChange: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct state', () => {
    const { result } = renderHook(() => useInlineEditor(defaultOptions));
    
    expect(result.current.isEditing).toBe(false);
    expect(result.current.currentValue).toBe('Test value');
    expect(result.current.hasChanges).toBe(false);
    expect(result.current.validationError).toBe(null);
  });

  it('starts editing correctly', () => {
    const onEditStart = jest.fn();
    const { result } = renderHook(() => 
      useInlineEditor({ ...defaultOptions, onEditStart })
    );
    
    act(() => {
      result.current.startEditing();
    });
    
    expect(result.current.isEditing).toBe(true);
    expect(onEditStart).toHaveBeenCalledTimes(1);
  });

  it('updates value and tracks changes', () => {
    const { result } = renderHook(() => useInlineEditor(defaultOptions));
    
    act(() => {
      result.current.startEditing();
    });
    
    act(() => {
      result.current.updateValue('Updated value');
    });
    
    expect(result.current.currentValue).toBe('Updated value');
    expect(result.current.hasChanges).toBe(true);
  });

  it('validates input correctly', () => {
    const validate = (value: string) => value.length < 3 ? 'Too short' : null;
    const { result } = renderHook(() => 
      useInlineEditor({ ...defaultOptions, validate })
    );
    
    act(() => {
      result.current.startEditing();
    });
    
    act(() => {
      result.current.updateValue('Hi');
    });
    
    expect(result.current.validationError).toBe('Too short');
  });

  it('stops editing and saves changes', () => {
    const onChange = jest.fn();
    const onEditComplete = jest.fn();
    const { result } = renderHook(() => 
      useInlineEditor({ ...defaultOptions, onChange, onEditComplete })
    );
    
    act(() => {
      result.current.startEditing();
    });
    
    act(() => {
      result.current.updateValue('New value');
    });
    
    act(() => {
      result.current.stopEditing(true);
    });
    
    expect(result.current.isEditing).toBe(false);
    expect(onChange).toHaveBeenCalledWith('New value');
    expect(onEditComplete).toHaveBeenCalledWith('New value');
  });

  it('stops editing and cancels changes', () => {
    const onChange = jest.fn();
    const onEditCancel = jest.fn();
    const { result } = renderHook(() => 
      useInlineEditor({ ...defaultOptions, onChange, onEditCancel })
    );
    
    act(() => {
      result.current.startEditing();
    });
    
    act(() => {
      result.current.updateValue('New value');
    });
    
    act(() => {
      result.current.stopEditing(false);
    });
    
    expect(result.current.isEditing).toBe(false);
    expect(result.current.currentValue).toBe('Test value');
    expect(onChange).not.toHaveBeenCalled();
    expect(onEditCancel).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard shortcuts', () => {
    const { result } = renderHook(() => useInlineEditor(defaultOptions));
    
    act(() => {
      result.current.startEditing();
    });
    
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    Object.defineProperty(enterEvent, 'preventDefault', {
      value: jest.fn()
    });
    
    act(() => {
      result.current.handleKeyDown(enterEvent as any);
    });
    
    expect(result.current.isEditing).toBe(false);
  });

  it('respects maxLength validation', () => {
    const { result } = renderHook(() => 
      useInlineEditor({ ...defaultOptions, maxLength: 5 })
    );
    
    act(() => {
      result.current.startEditing();
    });
    
    act(() => {
      result.current.updateValue('This is too long');
    });
    
    expect(result.current.validationError).toBe('Maximum 5 characters allowed');
  });
});