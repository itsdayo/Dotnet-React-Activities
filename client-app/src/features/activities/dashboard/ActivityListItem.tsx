import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityListItemAttendee from "./ActivityListItemAttendee";
import { DateTime } from "luxon";

interface Props {
  activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {
  return (
    <Segment.Group>
      <Segment>
        {activity.isCancelled && (
          <Label
            attached="top"
            color="red"
            content="Cancelled"
            style={{ textAlign: "center" }}
          />
        )}
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 3 }}
              size="tiny"
              circular
              src={activity.host?.image || `/assets/user.png`}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/activties/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>
                Hosted By{" "}
                <Link to={`/profiles/${activity.hostUsername}`}>
                  {" "}
                  {activity.host?.displayName}
                </Link>
              </Item.Description>
              {activity.isHost && (
                <Item.Description>
                  <Label basic color="orange">
                    You are hosting this activty
                  </Label>
                </Item.Description>
              )}
              {activity.isGoing && !activity.isHost && (
                <Item.Description>
                  <Label basic color="green">
                    You are going to this activty
                  </Label>
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />{" "}
          {DateTime.fromISO(activity.date?.toISOString() as string).toFormat(`L'/'dd'/'yyyy   h':'mma `)}
          <Icon name="marker" />
          {activity.venue}
        </span>
      </Segment>
      <Segment>
        <ActivityListItemAttendee attendees={activity.attendees!} />
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color="teal"
          content="View"
          floated="right"
        />
      </Segment>
    </Segment.Group>
  );
}
