<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	let email = $state('');
	let otp = $state('');
	let step = $state<'email' | 'otp'>('email');
	let loading = $state(false);
	let errorMsg = $state('');
	let message = $state('');

	async function sendOtp() {
		loading = true;
		errorMsg = '';
		message = '';
		try {
			const res = await fetch('/api/auth/send-otp', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});
			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				errorMsg = data.message || 'Er is iets misgegaan.';
				return;
			}
			message = 'Verificatiecode verstuurd naar je e-mail.';
			step = 'otp';
		} catch {
			errorMsg = 'Kon geen verbinding maken.';
		} finally {
			loading = false;
		}
	}

	async function verifyOtp() {
		loading = true;
		errorMsg = '';
		try {
			const res = await fetch('/api/auth/verify-otp', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, token: otp })
			});
			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				errorMsg = data.message || 'Ongeldige code.';
				return;
			}
			await invalidateAll();
			goto('/admin');
		} catch {
			errorMsg = 'Kon geen verbinding maken.';
		} finally {
			loading = false;
		}
	}

	function goBack() {
		step = 'email';
		otp = '';
		errorMsg = '';
		message = '';
	}
</script>

<svelte:head>
	<title>Inloggen — Goof Admin</title>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<div class="login">
	<div class="login__left">
		<div class="login__brand">
			<span class="login__logo">goof</span>
			<p class="login__tagline">Content Management</p>
		</div>
	</div>

	<div class="login__right">
		<div class="login__card">
			<div class="login__header">
				<h1 class="login__title">inloggen</h1>
				<p class="login__subtitle">
					{#if step === 'email'}
						Voer je e-mailadres in om een verificatiecode te ontvangen.
					{:else}
						Voer de 6-cijferige code in die we naar {email} hebben gestuurd.
					{/if}
				</p>
			</div>

			{#if errorMsg}
				<div class="login__error">{errorMsg}</div>
			{/if}
			{#if message}
				<div class="login__message">{message}</div>
			{/if}

			{#if step === 'email'}
				<form onsubmit={(e) => { e.preventDefault(); sendOtp(); }}>
					<div class="login__field">
						<label for="email">E-mailadres</label>
						<input
							id="email"
							type="email"
							placeholder="naam@goof.design"
							bind:value={email}
							required
							disabled={loading}
							autocomplete="email"
						/>
					</div>
					<button class="login__button" type="submit" disabled={loading}>
						{loading ? 'Versturen...' : 'Code versturen'}
					</button>
				</form>
			{:else}
				<form onsubmit={(e) => { e.preventDefault(); verifyOtp(); }}>
					<div class="login__field">
						<label for="otp">Verificatiecode</label>
						<input
							id="otp"
							type="text"
							class="login__otp-input"
							placeholder="000000"
							bind:value={otp}
							required
							disabled={loading}
							maxlength="6"
							inputmode="numeric"
							autocomplete="one-time-code"
						/>
					</div>
					<button class="login__button" type="submit" disabled={loading}>
						{loading ? 'Verifiëren...' : 'Inloggen'}
					</button>
					<button class="login__back" type="button" onclick={goBack}>
						← Ander e-mailadres gebruiken
					</button>
				</form>
			{/if}
		</div>
	</div>
</div>

<style>
	.login {
		min-height: 100vh;
		display: flex;
		font-family: 'Outfit', sans-serif;
	}
	.login__left {
		width: 45%;
		background-color: #4a5b4c;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 40px;
	}
	.login__brand { text-align: center; }
	.login__logo {
		font-weight: 500;
		font-size: 5rem;
		color: #fdff96;
		letter-spacing: -0.03em;
		line-height: 1;
		display: block;
		text-transform: lowercase;
	}
	.login__tagline {
		color: rgba(253, 255, 150, 0.6);
		font-size: 0.85rem;
		font-weight: 400;
		margin-top: 12px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	.login__right {
		width: 55%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 40px;
		background-color: #fdff96;
	}
	.login__card { width: 100%; max-width: 380px; }
	.login__header { margin-bottom: 32px; }
	.login__title {
		font-size: 2.5rem;
		font-weight: 500;
		color: #4a5b4c;
		margin: 0 0 8px;
		text-transform: lowercase;
	}
	.login__subtitle {
		font-size: 0.95rem;
		color: #4a5b4c;
		opacity: 0.8;
		margin: 0;
		line-height: 1.5;
		font-weight: 300;
	}
	.login__field { margin-bottom: 20px; }
	.login__field label {
		display: block;
		font-size: 0.8rem;
		font-weight: 500;
		color: #4a5b4c;
		margin-bottom: 8px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.login__field input {
		width: 100%;
		padding: 14px 16px;
		border: 1px solid #4a5b4c;
		border-radius: 12px;
		font-size: 1rem;
		font-family: inherit;
		font-weight: 300;
		outline: none;
		transition: border-color 0.2s;
		box-sizing: border-box;
		background: #fdff96;
		color: #4a5b4c;
	}
	.login__field input:focus { border-color: #25302b; border-width: 2px; padding: 13px 15px; }
	.login__otp-input {
		font-size: 1.8rem !important;
		letter-spacing: 12px;
		text-align: center;
		font-weight: 500;
		font-family: monospace !important;
	}
	.login__button {
		width: 100%;
		padding: 16px;
		background-color: #4a5b4c;
		color: #fdff96;
		border: none;
		border-radius: 50px;
		font-size: 0.95rem;
		font-weight: 500;
		font-family: inherit;
		cursor: pointer;
		transition: background-color 0.2s;
		text-transform: lowercase;
	}
	.login__button:hover:not(:disabled) { background-color: #3a4f44; }
	.login__button:disabled { opacity: 0.5; cursor: not-allowed; }
	.login__back {
		display: block;
		width: 100%;
		margin-top: 16px;
		padding: 10px;
		background: none;
		border: none;
		color: #4a5b4c;
		opacity: 0.7;
		font-size: 0.85rem;
		font-family: inherit;
		cursor: pointer;
		transition: opacity 0.2s;
	}
	.login__back:hover { opacity: 1; }
	.login__error {
		background-color: #4a5b4c;
		color: #fdff96;
		padding: 12px 16px;
		font-size: 0.9rem;
		font-weight: 400;
		margin-bottom: 20px;
		border-radius: 12px;
	}
	.login__message {
		background-color: #4a5b4c;
		color: #fdff96;
		padding: 12px 16px;
		font-size: 0.9rem;
		font-weight: 400;
		margin-bottom: 20px;
		border-radius: 12px;
	}
	@media (max-width: 768px) {
		.login { flex-direction: column; }
		.login__left { width: 100%; padding: 40px 20px; }
		.login__logo { font-size: 3rem; }
		.login__right { width: 100%; padding: 40px 20px; }
	}
</style>
