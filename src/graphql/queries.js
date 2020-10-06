
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
    ids
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
      questions(where: {archived: {_eq: false}}, order_by: {index: asc}){
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
const GET_STANDUP_RESPONSES = `
query getResponses($standup_id:uuid!){
  standup_by_pk(id: $standup_id) {
    id
    channel
    questions(where: {archived: {_eq: false}}, order_by: {index: asc}){
      id
      body
      archived
      index
    }
    standup_runs(order_by: {created_at: desc}) {
      created_at
      id
      
      responses(where: {body: {_is_null: false}, question: {archived: {_eq: false}}}) {
        body
        id
        question_id
        slackuser_id
        created_at
        question {
          body
          id
          index
        }
      }
    }
  }
}
`

const PAUSE_STANDUP = `
mutation stopStandup($standup_id: uuid!) {
  pauseStandup(standup_id: $standup_id){
    id
    name
    message
    cron_text
    channel
    creator_slack_id
    paused
    archived
    created_at
    updated_at 
  }
}
`
const UNPAUSE_STANDUP = `
mutation resumeStandup($standup_id: uuid!) {
  unpauseStandup(standup_id: $standup_id){
    id
    name
    message
    cron_text
    channel
    creator_slack_id
    paused
    archived
    created_at
    updated_at 
  }
}
`

export {
  GET_STANDUPS, GET_CHANNEL_MEMBERS, INSERT_STANDUP, GET_SINGLE_STANDUP,
  GET_STANDUP_RESPONSES, PAUSE_STANDUP, UNPAUSE_STANDUP
}