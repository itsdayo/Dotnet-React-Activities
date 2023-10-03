import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownProps,
  Form,
  Segment,
  Select,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityForn() {
  const { activityStore } = useStore();
  const {
    selectedActivity,
    closeForm,
    createActivity,
    updateActivity,
    loading,
  } = activityStore;
  const inintialState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    date: "",
    city: "",
    venue: "",
    description: "",
  };

  const [activity, setActivity] = useState(inintialState);

  const categoryOptions = [
    { text: "Culture", value: "culture" },
    { text: "Drinks", value: "drinks" },
    { text: "Film", value: "film" },
    { text: "Food", value: "food" },
    { text: "Music", value: "music" },
    { text: "Travel", value: "travel" },
  ];
  const handleSubmit = () => {
    activity.id ? updateActivity(activity) : createActivity(activity);
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
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
});
