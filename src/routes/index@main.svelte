<script context="module" lang="ts">
	import type { Chat as ChatType } from '../models/chat';
	import type { Message, MessageRes } from '../models/message';
	import type { Load } from '@sveltejs/kit';
	import { browser } from '$app/env';

	export const load: Load = async ({ fetch }) => {
		if (!browser) return;
		try {
			const generalChatUUID = 'acdf90a0-1408-11ed-8f13-436d0cf1e378';

			const token = localStorage.getItem('auth-token');

			if (!token || token === 'undefined')
				return {
					props: {
						auth: false
					}
				};

			let response = await fetch(`http://127.0.0.1:3000/api/chats/${generalChatUUID}`, {
				headers: {
					Authorization: token as string
				}
			});

			if (response.status === 401) {
				return {
					props: {
						auth: false
					}
				};
			}

			if (response.status !== 200) throw new Error(await response.text());

			const chat: ChatType = await response.json();

			response = await fetch(`http://127.0.0.1:3000/api/messages/${chat.uuid}`, {
				headers: {
					Authorization: token as string
				}
			});

			// If there aren't any messages, return an empty array for the messages
			if (response.status !== 200)
				return {
					props: {
						chat,
						chatMessages: []
					}
				};

			const messagesRes: MessageRes[] = await response.json();

			const messages: Message[] = messagesRes.map((messageRes) => {
				return {
					chat_uuid: messageRes.chat_uuid,
					sender_uuid: messageRes.sender_uuid,
					content: messageRes.content,
					sent_at: messageRes.sent_at
				};
			});

			return {
				props: {
					chat,
					chatMessages: messages
				}
			};
		} catch (er) {
			console.error(er);
		}
	};
</script>

<script lang="ts">
	import Chat from '../components/main/chat.svelte';
	import ChatStatus from '../components/main/chatStatus.svelte';
	import { onMount } from 'svelte';

	import { user } from '../stores/user';

	export let auth: boolean | undefined = undefined;
	export let chat: ChatType | undefined = undefined;
	export let chatMessages: Message[] | undefined = undefined;

	let loaded = false;

	onMount(() => {
		loaded = true;
	});
</script>

{#if !loaded}
	<ChatStatus />
{:else if $user && chat && chatMessages}
	<Chat {chat} {chatMessages} />
{:else if auth === false}
	<ChatStatus status="locked" />
{:else}
	<ChatStatus status="disconnected" />
{/if}
