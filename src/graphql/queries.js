//xoxb-1065528063712-1380933099575-nfdGvcjWeNDw5raigzgKqik1

const FETCH_WORKSPACE = `
query findWorkspace($slack_id: String!) {
  workspace_by_pk(slack_id: $slack_id){
    slack_id
    token
  }
}
`

const CREATE_WORKSPACE = `
mutation createWorkspace($slack_id:String!, $token: String!){
  insert_workspace_one(object: {slack_id: $slack_id, token: $token}){
    slack_id
    token
  }
}
`

const UPDATE_WORKSPACE = `
mutation updateWorkspace($slack_id: String!, $token: String!) {
  update_workspace_by_pk(pk_columns: {slack_id: $slack_id}, _set: {token: $token}){
    slack_id
    token
  }
}`

const GET_STANDUPS = `
query getStandups($creator_slack_id: String!) {
  standup(order_by: {created_at: desc}, where: {archived: {_eq: false}, creator_slack_id: {_eq: $creator_slack_id}}) {
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
  $token: String!
) {
  insertStandup(
    channel: $channel
    creator_slack_id: $creator_slack_id
    cron_text: $cron_text
    message: $message
    name: $name
    questions: $questions
    timezone: $timezone
    token: $token
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
    created_at
    updated_at 
  }
}
`
const DELETE_STANDUP = `
mutation deleteStandup($standup_id: uuid!) {
  deleteStandup(standup_id: $standup_id) {
    affected_rows
  }
}
`

const SEND_MESSAGE = `
mutation sendMessage($email: String!, $name: String!, $message: String!) {
  insert_message_one(object: {email: $email, message: $message, name: $name}){
    id
    email
    name
    message
    created_at
    updated_at
  }
}
`
export {
  GET_STANDUPS, GET_CHANNEL_MEMBERS, INSERT_STANDUP, GET_SINGLE_STANDUP,
  GET_STANDUP_RESPONSES, PAUSE_STANDUP, UNPAUSE_STANDUP, CREATE_WORKSPACE,
  FETCH_WORKSPACE, UPDATE_WORKSPACE, DELETE_STANDUP, SEND_MESSAGE

}