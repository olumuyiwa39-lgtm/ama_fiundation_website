# AMA Foundation & Media Website

Static website for AMA Foundation & Media, with AMA TV links, a Netlify enquiry form, and a Decap CMS area for managing stories and media.

## Deploy on Netlify

- Production branch: `main`
- Build command: leave blank
- Publish directory: `.` (repository root)
- Netlify Forms detection is enabled for the `ama-enquiry` form.

## Media and administration

The editor is at `/admin/`. It manages the AMA TV story list in `content/media.json` and uploads images to `assets/uploads/`. Keep videos on YouTube or another video service; add the video URL and an optional cover image in the editor.

To turn on editor sign-in:

1. Create a GitHub OAuth App for this site. Set its authorization callback URL to `https://api.netlify.com/auth/done`.
2. In Netlify, open this project’s OAuth/authentication provider settings, install the GitHub provider, and enter that OAuth App’s client ID and client secret. Enter the secret only in Netlify; do not put it in this repository or send it in chat.
3. Give each editor GitHub write access to this repository. The repository is public, so its website content and uploaded images are publicly readable; only approved collaborators can edit through the CMS.
4. Open `https://amafoundatio.netlify.app/admin/` and sign in with an approved GitHub account.

Once authentication is configured, edits are committed to `main` and Netlify publishes them automatically. Decap’s GitHub backend requires repository push access for CMS editors.

No founder photographs or other user-supplied media were present in the material used for this migration. Upload approved photos in the editor or place them in `assets/uploads/` and add them through the CMS.
