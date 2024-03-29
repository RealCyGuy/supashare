# supashare

A supa simple file sharing website made with SvelteKit and Supabase Storage.

<details>
  <summary>
   Screenshot
  </summary>

[![supashare](screenshots/mainpage.png)](https://supashare.netlify.app)

</details>

## Hosting on Netlify

Create a project on <https://supabase.io>.
Then, create a storage bucket called `files` and set `INSERT` and `SELECT` policies to

```sql
(bucket_id = 'files':: text)
```

You can deploy to netlify with this button:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/RealCyGuy/supashare)

Fill out the variables with your supabase's url and public key.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```
