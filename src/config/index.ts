const CONFIG = {
  secret: process.env.JWT_SECRET || 'secret', 
  expiresIn: '1h'
};

export default CONFIG;