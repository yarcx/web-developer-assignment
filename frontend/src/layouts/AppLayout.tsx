import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <main className="h-screen w-screen overflow-y-auto overflow-hidden bg-white flex justify-center items-start pt-30 pb-10">
      <section className="w-11/12 md:w-[641] lg:w-[856px]">
        <Outlet />
      </section>
    </main>
  );
};

export default AppLayout;
