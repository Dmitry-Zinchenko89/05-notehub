import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { NoteTag } from '../../types/note';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';

const schema = Yup.object().shape({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.mixed<NoteTag>().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']).required(),
});

interface Props {
  onClose: () => void;
}

const NoteForm = ({ onClose }: Props) => {
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
      initialValues={{ title: '', content: '', tag: 'Todo' as NoteTag }}
      validationSchema={schema}
      onSubmit={(values) => mutation.mutate(values)}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field name="title" type="text" />
            <ErrorMessage name="title" component="span" />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <Field as="textarea" name="content" rows={8} />
            <ErrorMessage name="content" component="span" />
          </div>
          <div>
            <label htmlFor="tag">Tag</label>
            <Field as="select" name="tag">
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" />
          </div>
          <div>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" disabled={isSubmitting}>Create note</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
