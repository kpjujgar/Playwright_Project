class InventoryPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
  }

  async getTitle() {
    return (await this.pageTitle.textContent())?.trim();
  }

  async getItemCount() {
    return this.inventoryItems.count();
  }
}

module.exports = { InventoryPage };
