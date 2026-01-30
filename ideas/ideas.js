 // Refuse login if username and password don't exist in localStorage
          alert('Invalid username or password. Please check your credentials.');
          return;




// fallback behaviour: if no ticket exists, still set a minimal session using username
          const username = usernameOrEmail;
          if (username) {
            const initial = username.trim().charAt(0).toUpperCase();
            localStorage.setItem('ibams_user', JSON.stringify({ username, profileImage: '/user-image/' + initial + '.jpeg' }));
          }


//afer successful login
  const homeUrl = '/home/index.html';
        window.location.href = homeUrl;


   // Navigate back to the page that led the user here when possible (document.referrer).
      // Fallback to the form action or root ('/') to avoid dead-ends on static hosts.
      (function navigateAfterRegister() {
        const action = form.getAttribute('action') || '/';
        let target = null;
        try {
          const ref = document.referrer;
          // only use referrer when it's non-empty and not the same as this page
          if (ref && ref !== window.location.href) {
            // basic sanity: ensure it's a valid URL
            try { new URL(ref); target = ref; } catch (_) { target = null; }
          }
        } catch (e) { /* ignore */ }

        if (!target) {
          target = action || '/';
        }

        // final guard: avoid redirecting back to register itself
        try {
          const curPath = new URL(window.location.href).pathname;
          const tgtPath = new URL(target, window.location.href).pathname;
          if (tgtPath === curPath) target = '/';
        } catch (e) { /* ignore */ }

        window.location.href = target;
       })();