import { WebClient } from "@slack/web-api"

const web = new WebClient("xoxb-401428056419-1366979354263-OnTpQbRfiw8eVvdOk5grZfVD");

export const getChannelsUsingCursor = async (channels, cursor) => {
    channels = channels || [];
    let payload = {};
    if (cursor)
        payload.cursor = cursor;
    let res = await web.conversations.list(payload);
    channels = channels.concat(res.channels);
    if (res.response_metadata && res.response_metadata.next_cursor && res.response_metadata.next_cursor.length) {
        return getChannelsUsingCursor(channels, res.response_metadata.next_cursor);
    }
    return channels;

}

export const getAllMembersUsingCursor = async (channel, members, cursor) => {
    // console.log(process.env.SLACK_BOT_TOKEN)
    members = members || [];
    let payload = {};
    if (cursor)
        payload.cursor = cursor;
    payload.channel = channel
    let res = await web.conversations.members(payload)
    members = members.concat(res.members);
    if (res.response_metadata && res.response_metadata.next_cursor && res.response_metadata.next_cursor.length) {
        return getAllMembersUsingCursor(channel, members, res.response_metadata.next_cursor);
    }
    return members;
}

export const remove_duplicates = (arr) => {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
}