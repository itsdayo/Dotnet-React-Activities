import { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { v4 as uuid } from "uuid";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ReuseableTextInput from "../../../app/common/form/ReuseableTextInput";
import ReuseableTextArea from "../../../app/common/form/ReuseableTextArea";
import ReuseableSelectInput from "../../../app/common/form/ReuseableSelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import ReuseableDatePicker from "../../../app/common/form/ReuseableDatePicker";

export default observer(function ActivityForn() {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    date: null,
    city: "",
    venue: "",
    description: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("The Activity Title is Required"),
    description: Yup.string().required("The Activity Description is Required"),
    category: Yup.string().required("The Activity Category is Required"),
    venue: Yup.string().required("The Activity Venue is Required"),
    city: Yup.string().required("The Activity City is Required"),
    date: Yup.string().required("The Activity Date is Required").nullable(),
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  const handleFormSubmit = (activity: Activity) => {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    }
  };

  if (loadingInitial)
    return <LoadingComponent content="Loading Activity..;." />;
  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <ReuseableTextInput name="title" placeholder="Title" />
            <ReuseableTextArea
              rows={3}
              placeholder="Description"
              name="description"
            />
            <ReuseableSelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <ReuseableDatePicker
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Header content="Location Details" sub color="teal" />
            <ReuseableTextInput placeholder="City" name="city" />
            <ReuseableTextInput placeholder="Venue" name="venue" />
            <Button
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
              disabled={isSubmitting || !dirty || !isValid}
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
