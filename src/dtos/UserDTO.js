export default function UserDTO(user) {
  return {
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    age: user.age
    // no enviamos password, cart ni datos sensibles
  };
}

