
const GET_STANDUPS = `
query getStandups($creator_slack_id: String!){
  standup(order_by: {created_at: desc},where: {creator_slack_id: {_eq: $creator_slack_id}}){
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
const INSERT_STANDUP = `
  mutation createStandup(
    $channel: String!
    $creator_slack_id: String!
    $cron_text: String!
    $message: String!
    $name: String!
    $questions: [String!]!
    $timezone: String!
  ) {
    insertStandup(
      channel: $channel
      creator_slack_id: $creator_slack_id
      cron_text: $cron_text
      message: $message
      name: $name
      questions: $questions
      timezone: $timezone
    ) {
      id
    }
  }
`;

const GET_SINGLE_STANDUP = `
query getStandup($standup_id: uuid!) {
  standup_by_pk(id: $standup_id){
    id
      name
      message
      cron_text
      channel
      question{
        id
        body
        archived
        index
      }
      creator_slack_id
      timezone
      paused
      archived
      created_at
      updated_at
    
  }
}

  `

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
export { GET_STANDUPS, GET_CHANNEL_MEMBERS, INSERT_STANDUP }