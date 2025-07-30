import { signOutAdmin } from "../../app/services/auth_service.js";

export function setupSignOutForm() {
    const signOutButton = document.getElementById('btn-logout-modal')

    signOutButton.addEventListener('click', async (e) => {
        const modal_permission = await Swal.fire({
            title: "Are you sure!",
            text: "Want to leave this account?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, sign out",
            cancelButtonText: "Cancel",
            allowOutsideClick: false
        });

        if (modal_permission.isConfirmed) {
            try {
                const res = await signOutAdmin();

                const modal_res_signout = await Swal.fire({
                    title: res.status === 200 ? "Success!" : "Failed!",
                    text: res.body.message,
                    icon: res.status === 200 ? "success" : "error",
                    allowOutsideClick: false
                });

                if (modal_res_signout.isConfirmed) {
                    localStorage.clear()
                    sessionStorage.clear()  
                    window.electronAPI.navigateTo('login_page.html')
                }
            } catch (err) {
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong while signing out",
                    icon: "error"
                });
            }
        }
    })
}
