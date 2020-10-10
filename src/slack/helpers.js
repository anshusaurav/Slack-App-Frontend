import { WebClient } from "@slack/web-api"

// const web = new WebClient("xoxb-401428056419-1366979354263-OnTpQbRfiw8eVvdOk5grZfVD");

export const getChannelsUsingCursor = async (token, channels, cursor) => {
    channels = channels || [];
    let payload = {};
    if (cursor)
        payload.cursor = cursor;
    const web = new WebClient(token);
    // payload.token = token;
    let res = await web.conversations.list(payload);
    channels = channels.concat(res.channels);
    if (res.response_metadata && res.response_metadata.next_cursor && res.response_metadata.next_cursor.length) {
        return getChannelsUsingCursor(token, channels, res.response_metadata.next_cursor);
    }
    return channels;

}

export const getAllMembersUsingCursor = async (token, channel, members, cursor) => {
    // console.log(process.env.SLACK_BOT_TOKEN)
    members = members || [];
    let payload = {};
    if (cursor)
        payload.cursor = cursor;
    // payload.token = token;
    const web = new WebClient(token);
    payload.channel = channel
    let res = await web.conversations.members(payload)
    members = members.concat(res.members);
    if (res.response_metadata && res.response_metadata.next_cursor && res.response_metadata.next_cursor.length) {
        return getAllMembersUsingCursor(token, channel, members, res.response_metadata.next_cursor);
    }
    return members;
}

export const getMemberInfo = async (token, user) => {
    // web.users.info({ user: member });
    const web = new WebClient(token);
    let payload = {}
    payload.user = user;
    let res = await web.users.info({ user });
    // console.log(res);
    if (res.ok)
        return res.user;
}

export const remove_duplicates = (arr) => {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
}