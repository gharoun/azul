export default function admin(req, res, next) {
  // 401 uNauthorized access
  //403 Forbidden
  if (!req.user.isAdmin)
    return res.status(403).json({ message: "Access denied" });
  next();
}
