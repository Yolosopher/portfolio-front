import TechFormRenderer from "@/components/admin/tech/TechFormRenderer";

const AdminTech = () => {
  return (
    <div className="container">
      <div className="relative flex justify-center items-center mb-4">
        <h1 className="text-4xl font-bold text-center">Tech Stack</h1>
        <div className="flex w-max absolute top-1/2 right-0 -translate-y-1/2">
          <TechFormRenderer />
        </div>
      </div>
    </div>
  );
};
export default AdminTech;
