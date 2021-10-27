const get_club_details= async ()=>
{
    let clubs= await axios.get('/project/api/clubs');
    console.log(clubs.data);
    return clubs.data;
}
get_club_details();