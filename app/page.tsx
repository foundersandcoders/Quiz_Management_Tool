
import { createClient } from '@/utils/supabase/server';
import checkAdmin from '@/utils/supabase/checkAdmin';
import { redirect } from 'next/navigation';


export default async function Index() {
  const supabase = await createClient();

 
    const checkUser = async () => {
      const { data: userInformation } = await supabase.auth.getUser();

      if (userInformation.user) {
        const isAdmin = await checkAdmin();
        if (isAdmin) {
          return redirect('/learners'); 
        } else {
          return redirect('/quizzes'); 
        }
      }
    };

  

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }
    await checkUser();
  return (
    <>
        <h2 className='font-medium text-xl mb-4'>Please sign in to use the FAC Quiz Site</h2>
      
    </>
  );
}
