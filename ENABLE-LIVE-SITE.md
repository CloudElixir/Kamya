# Make KAMYA preview live (fix 404)

The code is on GitHub. You only need to **turn on GitHub Pages** once.

## Fix in 60 seconds

1. Open this link (you must be logged into GitHub as repo owner):

   **https://github.com/CloudElixir/Kamya/settings/pages**

2. Under **Build and deployment** → **Source**, choose:

   **Deploy from a branch**

3. Set:
   - **Branch:** `main`
   - **Folder:** `/docs`

4. Click **Save**

5. Wait **2–5 minutes**, then open:

   **https://cloudelixir.github.io/Kamya/**

You should see the KAMYA UI gallery (not 404).

---

## Share with client

Send this link after it works:

```
https://cloudelixir.github.io/Kamya/
```

If the repo is **private**, either:
- Make the repo **Public** (Settings → General → Danger zone → Change visibility), or
- Add the client under **Settings → Collaborators**

---

## Still 404?

- Confirm **Folder** is `/docs` (not `/` or `/root`)
- Confirm branch is **main**
- Check **Actions** tab for failed workflows
- Hard refresh: Ctrl+Shift+R

Repository: https://github.com/CloudElixir/Kamya
