import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import {
  Button,
  DropdownProps,
  Form,
  Segment,
  Select,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { v4 as uuid } from "uuid";

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
    date: "",
    city: "",
    venue: "",
    description: "",
  });

  const categoryOptions = [
    { text: "Culture", value: "culture" },
    { text: "Drinks", value: "drinks" },
    { text: "Film", value: "film" },
    { text: "Food", value: "food" },
    { text: "Music", value: "music" },
    { text: "Travel", value: "travel" },
  ];

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  const handleSubmit = () => {
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

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSelectionChange = (
    event: SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => {
    setActivity({ ...activity, [data.name]: data.value });
  };

  if (loadingInitial)
    return <LoadingComponent content="Loading Activity..;." />;
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Dropdown
          control={Select}
          options={categoryOptions}
          placeholder="Category"
          onChange={handleSelectionChange}
          value={activity.category}
          name="category"
          fluid
          selection
        />
        <Form.Input
          placeholder="Date"
          value={activity.date}
          name="date"
          type="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          as={Link}
          to="/activities"
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
});
