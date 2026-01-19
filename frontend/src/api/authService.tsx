const API_URL = 'https://speakmate-backend-rhww.onrender.com';

export interface TutorData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  country: string;
  phone: string;
  avatar?: File | null;
  formation?: string;
  experience?: string;
  level?: string[];
  presentation?: string;
  termsAccepted: boolean;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface ApiResponse {
  message?: string;
  error?: string;
  token?: string;
  tutor?: TutorData;
  id?: string;
  email?: string;
  product?: string;
}

// Inscription tuteur
export const registerTutor = async (tutorData: TutorData): Promise<ApiResponse> => {
  try {
    const formData = new FormData();

    formData.append('firstname', tutorData.firstname);
    formData.append('lastname', tutorData.lastname);
    formData.append('email', tutorData.email);
    formData.append('phone', tutorData.phone || '');
    formData.append('password', tutorData.password);
    formData.append('country', tutorData.country);
    formData.append('termsAccepted', String(tutorData.termsAccepted));

    if (tutorData.avatar) {
      formData.append('avatar', tutorData.avatar);
    }

    if (tutorData.formation) formData.append('formation', tutorData.formation);
    if (tutorData.experience) formData.append('experience', tutorData.experience);
    if (tutorData.presentation) formData.append('presentation', tutorData.presentation);
    if (tutorData.level) {
      formData.append('level', JSON.stringify(tutorData.level)); // backend attend un tableau
    }

    const response = await fetch(`${API_URL}/api/tutor/signup`, {
      method: 'POST',
      body: formData,
    });

    const data: ApiResponse = await response.json();
    return data;

  } catch (err: any) {
    console.error('Erreur inscription tutor:', err);
    return { error: err.message || 'Erreur inconnue' };
  }
};

//---------------CONNEXION TUTEUR-----------
export const loginTutor= async(loginData:LoginData):Promise<ApiResponse> => {
  try{
    const response = await fetch(`${API_URL}/tutor/login`,
      ({
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      })
    )
    const data:ApiResponse= await response.json()
      if (!response.ok) {
            throw new Error(data.error || data.message || 'Erreur lors de la connexion');
        }
    return data
  }
  catch(error:any){
     console.error(' Erreur loginUser:', error);
        
        // Gestion erreur réseau
        if (error.message === 'Failed to fetch') {
            throw new Error('Impossible de contacter le serveur');
        }
        
        throw error;
  }
}