import { observer } from "mobx-react-lite";
import { Button, Header, Item, Segment, Image, Label } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import { useStore } from "../../../app/stores/store";
import { parseISO } from "date-fns";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  activity: Activity;
}

export default observer(function ActivityDetailedHeader({ activity }: Props) {
  const {
    activityStore: { updateAttendence, loading, cancelActivityToggle },
  } = useStore();
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        {activity.isCancelled && (
          <Label
            style={{ position: "absolute", zIndex: 1000, left: -14, top: 20 }}
            ribbon
            color="red"
            content="Cancel"
          />
        )}
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
                {activity.date && (
                  <p>
                    {format(
                      parseISO(activity.date!.toString()),
                      "dd MMM yyyy"
                    )}
                  </p>
                )}
                <p>
                  Hosted by{" "}
                  <strong>
                    <Link to={`/profiles/${activity.host?.username}`}>
                      {activity.host?.displayName}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {activity.isHost ? (
          <>
            <Button
              color={activity.isCancelled ? "green" : "red"}
              floated="left"
              basic
              content={
                activity.isCancelled ? "Reactivate Activity" : "Cancel Activity"
              }
              onClick={cancelActivityToggle}
            />
            <Button
              as={Link}
              disabled={activity.isCancelled}
              to={`/manage/${activity.id}`}
              color="orange"
              floated="right"
            >
              Manage Event
            </Button>
          </>
        ) : activity.isGoing ? (
          <Button loading={loading} onClick={updateAttendence}>
            Cancel attendance
          </Button>
        ) : (
          <Button
            disabled={activity.isCancelled}
            loading={loading}
            color="teal"
            onClick={updateAttendence}
          >
            Join Activity
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
});
