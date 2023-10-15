import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import ReuseableTextInput from "../../app/common/form/ReuseableTextInput";
import ReuseableTextArea from "../../app/common/form/ReuseableTextArea";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileEditForm({ setEditMode }: Props) {
  const {
    profileStore: { profile, updateProfile },
  } = useStore();
  return (
    <Formik
      initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
      onSubmit={(values) => {
        updateProfile(values).then(() => {
          setEditMode(false);
        });
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <ReuseableTextInput placeholder="Display Name" name="displayName" />
          <ReuseableTextArea rows={3} name="bio" placeholder="Add your bio" />
          <Button
            positive
            type="submit"
            loading={isSubmitting}
            content="Update profile"
            floated="right"
            disabled={!isValid || !dirty}
          />{" "}
        </Form>
      )}
    </Formik>
  );
});
