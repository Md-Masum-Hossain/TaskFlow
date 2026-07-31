import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';

const TRANSITION_DURATION = 200;

const priorityOptions = [
  { value: '', label: 'Select priority' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const statusOptions = [
  { value: '', label: 'Select status' },
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

function normalizeSelectValue(value) {
  if (value == null) {
    return '';
  }

  const normalized = String(value).trim().toLowerCase();

  if (normalized === 'in progress') {
    return 'in-progress';
  }

  return normalized;
}

function normalizeDateValue(value) {
  if (!value) {
    return '';
  }

  const stringValue = String(value).trim();

  return /^\d{4}-\d{2}-\d{2}$/.test(stringValue) ? stringValue : '';
}

function createFormValues(initialValues = {}) {
  return {
    title: initialValues.title || '',
    description: initialValues.description || '',
    priority: normalizeSelectValue(initialValues.priority),
    status: normalizeSelectValue(initialValues.status),
    dueDate: normalizeDateValue(initialValues.dueDate),
    assignee: initialValues.assignee || '',
  };
}

function validateForm(values) {
  const nextErrors = {};

  if (!values.title.trim()) {
    nextErrors.title = 'Task title is required.';
  }

  if (!values.priority) {
    nextErrors.priority = 'Priority is required.';
  }

  if (!values.status) {
    nextErrors.status = 'Status is required.';
  }

  return nextErrors;
}

export default function TaskModal({ open = false, onClose = () => {}, mode = 'create', initialValues, onSubmit = () => {} }) {
  const [shouldRender, setShouldRender] = useState(open);
  const [isVisible, setIsVisible] = useState(open);
  const [values, setValues] = useState(() => createFormValues(initialValues));
  const [errors, setErrors] = useState({});
  const closeTimeoutRef = useRef(null);
  const openFrameRef = useRef(null);
  const previousOverflowRef = useRef('');

  useEffect(() => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    if (open) {
      setShouldRender(true);
      setValues(createFormValues(initialValues));
      setErrors({});
      setIsVisible(false);

      openFrameRef.current = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => {
        if (openFrameRef.current) {
          window.cancelAnimationFrame(openFrameRef.current);
          openFrameRef.current = null;
        }
      };
    }

    setIsVisible(false);
    closeTimeoutRef.current = window.setTimeout(() => {
      setShouldRender(false);
    }, TRANSITION_DURATION);

    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
  }, [initialValues, open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflowRef.current;
    };
  }, [onClose, open]);

  if (!shouldRender) {
    return null;
  }

  const submitLabel = mode === 'edit' ? 'Save Changes' : 'Create Task';
  const title = mode === 'edit' ? 'Edit Task' : 'Create New Task';

  const handleBackdropMouseDown = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleChange = (field) => (event) => {
    const nextValue = event.target.value;

    setValues((current) => ({
      ...current,
      [field]: nextValue,
    }));

    setErrors((current) => {
      if (!current[field] || nextValue.trim()) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateForm(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({
      ...initialValues,
      title: values.title.trim(),
      description: values.description.trim(),
      priority: values.priority,
      status: values.status,
      dueDate: values.dueDate,
      assignee: values.assignee.trim(),
    });
  };

  const fieldClassName = (hasError) => `${hasError ? '!border-[#f04438]' : ''} focus:ring-4 focus:ring-[#dbeafe]`;

  const modal = (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[rgba(0,0,0,0.45)] px-4 py-4 sm:items-center sm:py-6 transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onMouseDown={handleBackdropMouseDown}
      aria-hidden={!isVisible}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        className={`w-full max-w-[640px] max-h-[calc(100vh-2rem)] overflow-y-auto rounded-xl bg-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] transition-all duration-200 sm:max-h-[calc(100vh-3rem)] ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#eaecf0] px-4 py-4 sm:px-6 sm:py-5">
          <div>
            <h2 id="task-modal-title" className="text-lg font-semibold tracking-[-0.02em] text-[#101828] sm:text-xl">
              {title}
            </h2>
            <p className="mt-1 text-sm text-[#667085]">Fill out the task details to continue.</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#667085] transition-colors duration-150 hover:bg-[#f2f4f7] hover:text-[#101828]"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5 px-4 py-4 sm:px-6 sm:py-6">
          <Input
            id="task-title"
            label="Task Title *"
            placeholder="Enter task title"
            value={values.title}
            onChange={handleChange('title')}
            aria-invalid={Boolean(errors.title)}
            className={fieldClassName(errors.title)}
          />
          {errors.title ? <p className="-mt-3 text-sm text-[#f04438]">{errors.title}</p> : null}

          <Textarea
            id="task-description"
            label="Description"
            placeholder="Describe the task"
            value={values.description}
            onChange={handleChange('description')}
            className="focus:ring-4 focus:ring-[#dbeafe]"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Select
                id="task-priority"
                label="Priority *"
                value={values.priority}
                onChange={handleChange('priority')}
                options={priorityOptions}
                aria-invalid={Boolean(errors.priority)}
                className={fieldClassName(errors.priority)}
              />
              {errors.priority ? <p className="mt-1.5 text-sm text-[#f04438]">{errors.priority}</p> : null}
            </div>

            <div>
              <Select
                id="task-status"
                label="Status *"
                value={values.status}
                onChange={handleChange('status')}
                options={statusOptions}
                aria-invalid={Boolean(errors.status)}
                className={fieldClassName(errors.status)}
              />
              {errors.status ? <p className="mt-1.5 text-sm text-[#f04438]">{errors.status}</p> : null}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="task-due-date"
              type="date"
              label="Due Date"
              value={values.dueDate}
              onChange={handleChange('dueDate')}
              className="focus:ring-4 focus:ring-[#dbeafe]"
            />

            <Input
              id="task-assignee"
              label="Assignee"
              placeholder="Optional assignee"
              value={values.assignee}
              onChange={handleChange('assignee')}
              className="focus:ring-4 focus:ring-[#dbeafe]"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-[#eaecf0] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="secondary" onClick={onClose} className="w-full px-5 sm:w-auto">
              Cancel
            </Button>

            <Button type="submit" className="w-full px-5 bg-[#2563eb] hover:bg-[#1d4ed8] sm:w-auto">
              {submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}