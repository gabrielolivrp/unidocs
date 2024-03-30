import { Button, Icon, Typography } from "@unidocs/ui";

const Footer = () => (
  <footer className="container mb-10">
    <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
      <div className="space-y-2">
        <Typography variant="h5">
          &copy; {new Date().getFullYear()}{" "}
          <a href="https://github.com/gabrielolivrp/unidocs">Unidocs</a>
        </Typography>

        <div className="space-x-2">
          <Button variant="ghost">
            <Icon name="Github" />
          </Button>
          <Button variant="ghost">
            <Icon name="Instagram" />
          </Button>
          <Button variant="ghost">
            <Icon name="Twitter" />
          </Button>
        </div>
      </div>

      <div>
        <Typography variant="h5">Protocol</Typography>
        <ul>
          <li>
            <Button variant="link" className="p-0">
              Governance
            </Button>
          </li>
          <li>
            <Button variant="link" className="p-0">
              Developers
            </Button>
          </li>
        </ul>
      </div>

      <div>
        <Typography variant="h5">Need help?</Typography>
        <ul>
          <li>
            <Button variant="link" className="p-0">
              Contact us
            </Button>
          </li>
          <li>
            <Button variant="link" className="p-0">
              Help Center
            </Button>
          </li>
        </ul>
      </div>

      <div>
        <Typography variant="h5">Legal</Typography>
        <ul>
          <li>
            <Button variant="link" className="p-0">
              Privacy Policy
            </Button>
          </li>
          <li>
            <Button variant="link" className="p-0">
              Terms &amp; Conditions
            </Button>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export { Footer };
