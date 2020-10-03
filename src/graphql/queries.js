
const GET_STANDUPS = `
query getStandups($creator_slack_id: String!){
  standup(where: {creator_slack_id: {_eq: $creator_slack_id}}){
    id
    name
    message
    cron_text
    channel
    creator_slack_id
    timezone
    paused
    archived
    created_at
    updated_at
  }
}
`;

const GET_CHANNEL_MEMBERS = `
 query getStandups($channel: String!){
  getMembers(channel: $channel){
    images
    real_names
  }
 } 
`;
// export const INSERT_STANDUP = gql`
//   mutation MyMutation(
//     $channel: String!
//     $creator_slack_id: String!
//     $cron_text: String!
//     $message: String!
//     $name: String!
//     $questions: [String!]!
//     $timezone: String!
//   ) {
//     insertStandup(
//       channel: $channel
//       creator_slack_id: $creator_slack_id
//       cron_text: $cron_text
//       message: $message
//       name: $name
//       questions: $questions
//       timezone: $timezone
//     ) {
//       id
//     }
//   }
// `;

// export const DELETE_STANDUP = gql`
//   mutation MyMutation($standup_id: uuid!) {
//     deleteStandup(standup_id: $standup_id) {
//       affected_rows
//     }
//   }
// `;

// export const UPDATE_STANDUP = gql`
//   mutation MyMutation(
//     $channel: String!
//     $cron_text: String!
//     $message: String!
//     $name: String!
//     $standup_id: String!
//   ) {
//     updateStandup(
//       channel: $channel
//       cron_text: $cron_text
//       message: $message
//       name: $message
//       standup_id: $standup_id
//     ) {
//       affected_rows
//     }
//   }
// `;
export { GET_STANDUPS, GET_CHANNEL_MEMBERS }