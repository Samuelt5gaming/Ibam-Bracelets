;(function(){
	function getStored(){ try { return JSON.parse(localStorage.getItem('ibams_user')||'null'); } catch(e){ return null; } }
	function renderProfile(){
		const data = getStored();
		const navLinks = document.querySelector('.nav .nav-links'); if (!navLinks) return;
		const formEl = navLinks.querySelector('.form');
		let profileEl = navLinks.querySelector('.profile');
		if (!profileEl){ profileEl = document.createElement('div'); profileEl.className='profile';
			const img = document.createElement('img'); img.alt='profile'; img.src=''; profileEl.appendChild(img); navLinks.appendChild(profileEl);
		}
		const img = profileEl.querySelector('img');
		if (data && data.username){ const profileImage = data.profileImage || ('/user-image/' + (data.username.trim().charAt(0)||'A').toUpperCase() + '.jpeg'); img.src=profileImage; img.alt=data.username; profileEl.style.display='flex'; if(formEl) formEl.style.display='none'; }
		else { profileEl.style.display='none'; if(formEl) formEl.style.display=''; }
	}
	document.addEventListener('DOMContentLoaded', renderProfile);
	window.addEventListener('storage', renderProfile);
})();
