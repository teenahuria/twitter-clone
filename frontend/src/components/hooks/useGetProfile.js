import { useEffect } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant.js';
import { useDispatch } from 'react-redux';
import { getMyProfile } from '../../redux/userSlice.js';

const useGetProfile = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return; // ✅ Skip if id is undefined

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        console.log("✅ API Response:", res.data); //  Debug line
        dispatch(getMyProfile(res.data.user)); //  Dispatch to Redux
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, [id]);
};

export default useGetProfile;
