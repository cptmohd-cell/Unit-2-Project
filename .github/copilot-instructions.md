# AutoSpace Performance Parts - Copilot Instructions

## Architecture Overview

This is an Express.js MVC application for an automotive parts marketplace with EJS templating and MongoDB/Mongoose for data persistence.

**Request flow:** `server.js` → middleware (`pass-user-to-view` → session) → controllers → models → views

**Key architectural decisions:**
- Routes are split: public (`/auth`, `/`) vs protected (`/parts`) - protected routes require `isSignedIn` middleware
- User session data is attached to `req.session.user` with `{ username, _id }`
- Views receive user via `res.locals.user` (set by `pass-user-to-view` middleware)

## Project Structure

```
controllers/     # Express routers - one per resource (auth.js, parts.js)
middleware/      # Auth guards and view helpers
models/          # Mongoose schemas (Part.js, User.js)
views/           # EJS templates organized by resource
public/css/      # Single stylesheet with CSS variables
```

## Development Commands

```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Production start
```

**Environment variables required:** `MONGODB_URI`, `SESSION_SECRET`

## Coding Patterns

### Controllers
- Use Express Router, export single router per file
- Pattern: `router.get/post/put/delete` → try/catch → `res.render()` or `res.redirect()`
- Always `.populate("owner")` when fetching Parts for display
- Authorization check: `part.owner.equals(req.session.user._id)`

```javascript
// Example from controllers/parts.js
router.put("/:partId", async (req, res) => {
  try {
    const part = await Part.findById(req.params.partId);
    if (!part.owner.equals(req.session.user._id)) {
      return res.send("You are not authorized to update this part.");
    }
    await Part.findByIdAndUpdate(req.params.partId, req.body);
    res.redirect(`/parts/${req.params.partId}`);
  } catch (error) {
    console.error(error);
    res.redirect("/parts");
  }
});
```

### Models
- Use Mongoose schemas with validation (`required`, `enum`, `min`)
- Part categories: `['Engine', 'Transmission', 'Brakes', 'Suspension', 'Electrical', 'Body', 'Interior', 'Exhaust', 'Cooling', 'Other']`
- Part conditions: `['New', 'Used', 'Refurbished']`
- Always include `timestamps: true` for audit fields

### Views (EJS)
- Include shared partials: `<%- include('../navbar') %>`, `<%- include('../footer') %>`
- Access user state via `user` variable (null if not logged in)
- Forms use `method="POST"` with `method-override` for PUT/DELETE via `?_method=PUT`
- Link stylesheets from `/css/style.css`

### Styling
- CSS uses custom properties defined in `:root` (see `public/css/style.css`)
- Primary color: `--primary-color: #dc2626` (red theme)
- Use existing utility classes: `.container`, `.btn`, `.btn-primary`, `.form-group`

## Data Model Reference

**Part** (owner relationship to User):
- `name`, `partNumber`, `manufacturer`, `vehicleCompatibility`, `description` (String, required)
- `category` (enum), `condition` (enum)
- `price`, `quantity` (Number, min: 0)
- `owner` (ObjectId ref to User)

**User**: `username`, `password` (hashed with bcrypt, 10 rounds)

## Authentication Flow

1. Sign-up: Hash password → create User → redirect to sign-in
2. Sign-in: Find user → compare password → set `req.session.user` → redirect home
3. Sign-out: `req.session.destroy()` → redirect home
4. Protected routes: `isSignedIn` middleware redirects to `/auth/sign-in` if no session
