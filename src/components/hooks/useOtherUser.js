import { useEffect } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant.js';
import { useDispatch } from 'react-redux';
import { getMyProfile, getOtherUsers } from '../../redux/userSlice.js';


const useOtherUser = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return; //Skip if id is undefined

    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/otheruser/${id}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        console.log(" API Response:", res.data); //  Debug line
        dispatch(getOtherUsers(res.data.otherUsers)); // Dispatch to Redux
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchOtherUsers();
  }, [id]);
};

export default useOtherUser;
