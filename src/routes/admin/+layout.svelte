<script lang="ts">
	import { page } from '$app/stores';
	let { children, data } = $props();

	const isLogin = $derived($page.url.pathname === '/admin/login');

	const navItems = [
		{ href: '/admin', label: 'Dashboard', exact: true },
		{ href: '/admin/teksten', label: 'Teksten' },
		{ href: '/admin/projecten', label: 'Projecten' },
		{ href: '/admin/media', label: 'Media' }
	];

	function isActive(href: string, exact = false) {
		if (exact) return $page.url.pathname === href;
		return $page.url.pathname.startsWith(href);
	}
</script>

<svelte:head>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

{#if isLogin}
	{@render children()}
{:else}
	<div class="admin">
		<aside class="admin__sidebar">
			<div class="admin__brand">
				<a href="/admin" class="admin__logo">goof</a>
				<span class="admin__sub">cms</span>
			</div>

			<nav class="admin__nav">
				{#each navItems as item}
					<a
						href={item.href}
						class="admin__navlink"
						class:active={isActive(item.href, item.exact)}
					>
						{item.label}
					</a>
				{/each}
			</nav>

			<div class="admin__user">
				{#if data.session?.user?.email}
					<span class="admin__email">{data.session.user.email}</span>
				{/if}
				<form method="POST" action="/api/auth/logout">
					<button type="submit" class="admin__logout">Uitloggen</button>
				</form>
				<a href="/" target="_blank" class="admin__viewsite">→ Website bekijken</a>
			</div>
		</aside>

		<main class="admin__main">
			{@render children()}
		</main>
	</div>
{/if}

<style>
	:global(body) {
		margin: 0;
	}
	.admin {
		display: grid;
		grid-template-columns: 240px 1fr;
		min-height: 100vh;
		font-family: 'Outfit', sans-serif;
		background: #faf9f4;
		color: #25302b;
	}
	.admin__sidebar {
		background: #4a5b4c;
		color: #fdff96;
		padding: 24px 16px;
		display: flex;
		flex-direction: column;
		gap: 24px;
		position: sticky;
		top: 0;
		height: 100vh;
		box-sizing: border-box;
	}
	.admin__brand {
		display: flex;
		align-items: baseline;
		gap: 6px;
		padding: 0 8px 16px;
		border-bottom: 1px solid rgba(253, 255, 150, 0.2);
	}
	.admin__logo {
		font-size: 1.6rem;
		font-weight: 500;
		text-decoration: none;
		color: #fdff96;
		text-transform: lowercase;
	}
	.admin__sub {
		font-size: 0.7rem;
		font-weight: 400;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		opacity: 0.6;
	}
	.admin__nav {
		display: flex;
		flex-direction: column;
		gap: 4px;
		flex: 1;
	}
	.admin__navlink {
		padding: 10px 12px;
		border-radius: 8px;
		text-decoration: none;
		color: #fdff96;
		font-size: 0.95rem;
		font-weight: 300;
		opacity: 0.75;
		transition: all 0.15s ease;
	}
	.admin__navlink:hover {
		opacity: 1;
		background: rgba(253, 255, 150, 0.08);
	}
	.admin__navlink.active {
		opacity: 1;
		background: rgba(253, 255, 150, 0.15);
		font-weight: 500;
	}
	.admin__user {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding-top: 16px;
		border-top: 1px solid rgba(253, 255, 150, 0.2);
	}
	.admin__email {
		font-size: 0.75rem;
		opacity: 0.6;
		padding: 0 8px;
		word-break: break-all;
	}
	.admin__logout {
		background: none;
		border: 1px solid rgba(253, 255, 150, 0.3);
		color: #fdff96;
		padding: 8px 12px;
		border-radius: 8px;
		font-size: 0.85rem;
		font-family: inherit;
		font-weight: 300;
		cursor: pointer;
		text-align: left;
		transition: all 0.15s ease;
	}
	.admin__logout:hover { background: rgba(253, 255, 150, 0.1); }
	.admin__viewsite {
		font-size: 0.8rem;
		color: #fdff96;
		opacity: 0.6;
		text-decoration: none;
		padding: 4px 8px;
	}
	.admin__viewsite:hover { opacity: 1; }
	.admin__main {
		padding: 32px 40px;
		max-width: 100%;
		overflow-x: auto;
	}
	@media (max-width: 768px) {
		.admin { grid-template-columns: 1fr; }
		.admin__sidebar {
			position: static;
			height: auto;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 12px;
			padding: 16px;
		}
		.admin__brand { padding-bottom: 0; border-bottom: none; }
		.admin__nav { flex: 1 0 100%; flex-direction: row; flex-wrap: wrap; }
		.admin__user { flex: 1 0 100%; flex-direction: row; align-items: center; padding-top: 0; border-top: none; }
		.admin__email { padding: 0; }
		.admin__main { padding: 20px; }
	}
</style>
