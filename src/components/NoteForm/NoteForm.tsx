import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';
import type { NoteTag } from '../../types/note';

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required(),
  content: Yup.string().required(),
  tag: Yup.string().oneOf(['work', 'personal', 'important']).required(),
});

export const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'personal' as NoteTag }}
      validationSchema={validationSchema}
      onSubmit={values => mutation.mutate(values)}
    >
      <Form>
        <label>Title</label>
        <Field name="title" />
        <ErrorMessage name="title" />

        <label>Content</label>
        <Field name="content" />
        <ErrorMessage name="content" />

        <label>Tag</label>
        <Field as="select" name="tag">
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="important">Important</option>
        </Field>
        <ErrorMessage name="tag" />

        <button type="submit">Create</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </Form>
    </Formik>
  );
};