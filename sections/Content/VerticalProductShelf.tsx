const VerticalProductShelf = () => {
  return (
    <section class="flex flex-col">
      <div>Title</div>
      <div class="w-full container flex flex-col items-center justify-center  lg:flex-row lg:justify-between">
        <div class="w-1/3">
          Products
        </div>
        <div class="w-full">
          Image
        </div>
      </div>
    </section>
  );
};

export default VerticalProductShelf;
