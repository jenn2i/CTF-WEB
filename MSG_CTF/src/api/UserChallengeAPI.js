import axios from "axios";
import Cookies from 'js-cookie';

const API_URL = "/api/users/challenges";

export const fetchSolvedChallenges = async () => {
  try {
    const token = Cookies.get("accessToken");  // 토큰 가져오기
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("푼 문제 API 응답:", response.data); // 응답 데이터 확인
    
    if (response.data.code === "SUCCESS") {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "데이터를 불러오는 데 실패했습니다.");
    }
  } catch (error) {
    console.error("푼 문제 목록을 불러오는 중 오류 발생:", error);
    return [];
  }
};