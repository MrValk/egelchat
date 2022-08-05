export type Message = {
	chat_uuid: string;
	sender_uuid: string;
	content: string;
	// YYYY-MM-DD hh:mm:ss
	sent_at: string;
};

export type MessageFull = {
	chat_uuid: string;
	sender_uuid: string;
	content: string;
	// YYYY-MM-DD hh:mm:ss
	sent_at: string;
	sender_name: string;
	sender_pf_pic: string;
};

export type MessageDB = {
	chat_uuid: Buffer;
	sender_uuid: Buffer;
	content: string;
	// YYYY-MM-DD hh:mm:ss
	sent_at: string;
};

export type MessageRes = {
	id: number;
	chat_uuid: string;
	sender_uuid: string;
	content: string;
	// YYYY-MM-DD hh:mm:ss
	sent_at: string;
};

export default Message;
