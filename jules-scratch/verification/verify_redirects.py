from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Sign up
    page.goto("http://localhost:5173/login")
    page.wait_for_selector('[data-testid="signup-toggle"]')
    page.get_by_test_id("signup-toggle").click()
    page.get_by_label("Name").fill("testuser")
    page.get_by_label("Email").fill("testuser@example.com")
    page.get_by_label("Password").fill("password")
    page.get_by_role("button", name="Sign Up").click()
    page.wait_for_url("http://localhost:5173/testuser/setup")

    # Set up instance
    page.get_by_placeholder("Instance Name").fill("Test Salon")
    page.get_by_placeholder("Your Phone Number").fill("1234567890")
    page.get_by_role("button", name="Create Instance").click()
    page.wait_for_url("http://localhost:5173/testuser")
    page.screenshot(path="jules-scratch/verification/setup_redirect.png")

    # Sign out
    # This is a placeholder, as there is no logout button in the UI
    page.goto("http://localhost:5173/login")

    # Sign in
    page.get_by_label("Email").fill("testuser@example.com")
    page.get_by_label("Password").fill("password")
    page.get_by_role("button", name="Sign In").click()
    page.wait_for_url("http://localhost:5173/testuser")
    page.screenshot(path="jules-scratch/verification/signin_redirect.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
