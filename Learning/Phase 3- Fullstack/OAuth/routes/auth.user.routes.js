export const signInController = async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All credentials are required",
      success: false,
    });
  }

  
};
