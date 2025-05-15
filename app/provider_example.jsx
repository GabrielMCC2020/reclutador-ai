const createNewUser = async () => {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  console.log(userData); // <--- agrega esto
  console.log(userData?.user); // <--- y esto

  if (userError || !userData?.user) {
    console.error('Error al obtener usuario:', userError);
    return;
  }

  const user = userData.user;

  const { data: existingUsers, error: fetchError } = await supabase
    .from('Users')
    .select('id')
    .eq('id', user.id);

  if (fetchError) {
    console.error('Error al verificar usuario en Users:', fetchError);
    return;
  }

  if (!existingUsers || existingUsers.length === 0) {
    const { data: insertData, error: insertError } = await supabase
      .from('Users')
      .insert([{
        id: user.id,
        name: user.user_metadata?.name || '',
        email: user.email,
        picture: user.user_metadata?.picture || '',
        credits: 3
      }]);

    if (insertError) {
      console.error('Error al insertar usuario:', insertError);
    } else {
      console.log('Usuario insertado en tabla Users:', insertData);
    }
  } else {
    console.log('El usuario ya existe en tabla Users.');
  }
};
