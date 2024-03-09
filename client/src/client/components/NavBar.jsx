import { Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
    //     <Navbar fluid rounded className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
    //       <Navbar.Brand as={Link} href="https://flowbite-react.com">
    //         <img src="https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
    //       </Navbar.Brand>
    //       <Navbar.Toggle />
    //       <Navbar.Collapse>
    //         <div>
    //         <Navbar.Link href="#" active>
    //           Create Event
    //         </Navbar.Link>
    //         </div>
    //         <br></br>
    //         <div>
    //         <Navbar.Link as={Link} href="#">
    //           Profile
    //         </Navbar.Link>
    //         </div>
    //         <br></br>
    //         <Navbar.Link href="#">Logout</Navbar.Link>
    //       </Navbar.Collapse>
    //     </Navbar>
    //   );

<aside class="fixed top-0 left-0 w-64 h-full" aria-label="Sidenav">
  <div class="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <ul class="space-y-2">
          <li>
              <a class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" href="#">
                  Overview
              </a>
          </li>
          <li>
              <a class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" href="#">
                  Pages
              </a>
          </li>
      </ul>
  </div>
</aside>
  );
}

export default NavBar;