import { Card, Timeline } from "flowbite-react";

export default function JobActivityCard() {
  return (
    <Card className="relative overflow-y-scroll">
      <h3 className="sticky text-xl font-semibold">Job Activity</h3>
      <Timeline>
        <Timeline.Item>
          <Timeline.Point />
          <Timeline.Content>
            <Timeline.Time>February 2022</Timeline.Time>
            <Timeline.Title>Proposal sent</Timeline.Title>
            <Timeline.Body>
              A proposal was sent for 11761 S Colton road.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point />
          <Timeline.Content>
            <Timeline.Time>March 2022</Timeline.Time>
            <Timeline.Title>Payment received</Timeline.Title>
            <Timeline.Body>
              A payment was received for 112342 South Street.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point />
          <Timeline.Content>
            <Timeline.Time>March 2022</Timeline.Time>
            <Timeline.Title>Photos added</Timeline.Title>
            <Timeline.Body>
              Photos have been added to 112342 South Street.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    </Card>
  );
}
