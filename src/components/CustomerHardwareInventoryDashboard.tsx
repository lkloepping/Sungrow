// Image asset URLs from Figma
const imgIcon = "https://www.figma.com/api/mcp/asset/a72747cf-462a-4a01-adc5-4dea52de4c98";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/5fcce32c-f8dd-45ef-a2fb-4c4d9fd933a8";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/8d70c90f-6910-4753-a651-da0f477f3246";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/606571b0-2853-4906-962d-b8cf7100257a";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/80668aec-cb8e-419b-9eaf-31aab21a6ced";
const imgIcon5 = "https://www.figma.com/api/mcp/asset/d3afb60f-3e6b-4120-82e7-32d318ede641";
const imgIcon6 = "https://www.figma.com/api/mcp/asset/a61b9437-5ad3-4904-9637-3503eeeb7e01";
const imgIcon7 = "https://www.figma.com/api/mcp/asset/90996d95-7d5b-42f0-a460-683813a07293";
const imgIcon8 = "https://www.figma.com/api/mcp/asset/fd6d2fad-3747-4098-b2d6-9f0adf9a70ff";
const imgIcon9 = "https://www.figma.com/api/mcp/asset/4a49fe17-11ab-4c67-a095-f242c91354ba";
const imgIcon10 = "https://www.figma.com/api/mcp/asset/65007dc8-4414-415e-88b4-a8cdd2721fa5";
const imgIcon11 = "https://www.figma.com/api/mcp/asset/315bbf64-0c18-4d62-8f5a-11628a62668b";
const imgIcon12 = "https://www.figma.com/api/mcp/asset/43836477-5881-4c3d-ac30-010c74b0cf14";
const imgIcon13 = "https://www.figma.com/api/mcp/asset/c0f95b94-ccb5-43ea-b081-9e4ad36361ef";
const imgIcon14 = "https://www.figma.com/api/mcp/asset/3a2ae130-3520-4523-a117-cee7aa74e060";
const imgVector = "https://www.figma.com/api/mcp/asset/f1f9483f-2170-445b-9cd5-0b5deb29d4ed";
const imgIcon15 = "https://www.figma.com/api/mcp/asset/a2130f63-504c-47d3-99c6-1e56143771e4";
const imgVector4 = "https://www.figma.com/api/mcp/asset/7e284b46-3f00-4f3c-9e37-b5e539a2f32d";
const imgVector7 = "https://www.figma.com/api/mcp/asset/f26cfee5-35d6-480f-b86d-7c3e617baca2";
const imgVector9 = "https://www.figma.com/api/mcp/asset/9bd2150b-095c-48b7-ac0d-c8c1212cb2ee";
const imgIcon16 = "https://www.figma.com/api/mcp/asset/a5b22675-4ab8-4670-ab13-2dadf1d83e8e";
const imgIcon17 = "https://www.figma.com/api/mcp/asset/04a12f13-3e77-4bf9-b6e7-2833b4386010";
const imgIcon18 = "https://www.figma.com/api/mcp/asset/e4b2f225-7ad4-42d4-8576-6da1d8cb0a81";
const imgIcon19 = "https://www.figma.com/api/mcp/asset/e3f29341-94f9-4a40-92e0-1ca853b62786";

export default function CustomerHardwareInventoryDashboard() {
  return (
    <div className="bg-neutral-950 min-h-screen w-full" data-name="Customer Hardware Inventory Dashboard" data-node-id="1:2">
      <div className="bg-[#020618] min-h-screen w-full" data-name="App" data-node-id="1:3">
        {/* Header */}
        <div className="bg-[#0f172b] border-b border-[#1d293d] px-[147.5px] py-4" data-name="Container" data-node-id="1:4">
          <div className="flex items-center justify-between max-w-[1271px] mx-auto" data-name="Container" data-node-id="1:5">
            <div className="flex items-center gap-3" data-name="Container" data-node-id="1:6">
              <div className="w-8 h-8" data-name="Icon" data-node-id="1:7">
                <img alt="" className="w-full h-full" src={imgIcon} />
              </div>
              <div className="flex flex-col" data-name="Container" data-node-id="1:9">
                <h1 className="text-2xl font-medium text-slate-50 leading-9" data-name="Heading 1" data-node-id="1:10">
                  Aegis Firmware & Device Management
                </h1>
                <p className="text-base text-[#90a1b9]" data-name="Paragraph" data-node-id="1:12">
                  Enterprise-grade security and compliance platform
                </p>
              </div>
            </div>
            <button className="bg-[rgba(38,38,38,0.3)] border border-neutral-800 w-9 h-9 flex items-center justify-center" data-name="Button" data-node-id="1:14">
              <div className="w-4 h-4" data-name="Icon" data-node-id="1:15">
                <img alt="" className="w-full h-full" src={imgIcon1} />
              </div>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-[147.5px] py-8" data-name="Container" data-node-id="1:25">
          <div className="max-w-[1271px] mx-auto flex gap-6" data-name="AegisDashboard" data-node-id="1:26">
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-6" data-name="AegisDashboard" data-node-id="1:26">
              {/* Critical Alerts Card */}
              <div className="bg-[rgba(70,8,9,0.3)] border border-[rgba(251,44,54,0.3)] rounded p-6 flex flex-col gap-6" data-name="Card" data-node-id="1:27">
                <div className="flex items-center justify-between" data-name="CardHeader" data-node-id="1:28">
                  <div className="flex items-center gap-2" data-name="AegisDashboard" data-node-id="1:29">
                    <div className="w-5 h-5" data-name="Icon" data-node-id="1:31">
                      <img alt="" className="w-full h-full" src={imgIcon2} />
                    </div>
                    <h2 className="text-base text-slate-50" data-name="CardTitle" data-node-id="1:35">
                      Critical Alerts
                    </h2>
                  </div>
                  <div className="bg-[rgba(130,24,26,0.6)] px-2.5 py-1 rounded text-xs font-medium text-white" data-name="Badge" data-node-id="1:37">
                    1 Critical
                  </div>
                </div>
                <p className="text-base text-[#90a1b9]" data-name="CardDescription" data-node-id="1:39">
                  Behavioral Monitoring & Security Events
                </p>
                <div className="flex flex-col gap-3" data-name="CardContent" data-node-id="1:41">
                  {/* Alert Items */}
                  <div className="bg-[rgba(15,23,43,0.5)] border border-neutral-800 rounded p-4 flex items-start justify-between" data-name="AegisDashboard" data-node-id="1:42">
                    <div className="flex-1 flex flex-col gap-1" data-name="Container" data-node-id="1:43">
                      <div className="flex items-center gap-2" data-name="Container" data-node-id="1:44">
                        <div className="w-4 h-4" data-name="Icon" data-node-id="1:45">
                          <img alt="" className="w-full h-full" src={imgIcon3} />
                        </div>
                        <p className="text-base text-slate-100" data-name="Paragraph" data-node-id="1:49">
                          Unsigned Firmware Download Attempt
                        </p>
                      </div>
                      <p className="text-base text-[#90a1b9]" data-name="Paragraph" data-node-id="1:51">
                        Behavioral Monitoring
                      </p>
                    </div>
                    <p className="text-base text-[#90a1b9]" data-name="Text" data-node-id="1:53">
                      2 minutes ago
                    </p>
                  </div>
                  <div className="bg-[rgba(15,23,43,0.5)] border border-neutral-800 rounded p-4 flex items-start justify-between" data-name="AegisDashboard" data-node-id="1:55">
                    <div className="flex-1 flex flex-col gap-1" data-name="Container" data-node-id="1:56">
                      <div className="flex items-center gap-2" data-name="Container" data-node-id="1:57">
                        <div className="w-4 h-4" data-name="Icon" data-node-id="1:58">
                          <img alt="" className="w-full h-full" src={imgIcon4} />
                        </div>
                        <p className="text-base text-slate-100" data-name="Paragraph" data-node-id="1:62">
                          Deployment Mismatch Detected
                        </p>
                      </div>
                      <p className="text-base text-[#90a1b9]" data-name="Paragraph" data-node-id="1:64">
                        Behavioral Monitoring
                      </p>
                    </div>
                    <p className="text-base text-[#90a1b9]" data-name="Text" data-node-id="1:66">
                      15 minutes ago
                    </p>
                  </div>
                  <div className="bg-[rgba(15,23,43,0.5)] border border-neutral-800 rounded p-4 flex items-start justify-between" data-name="AegisDashboard" data-node-id="1:68">
                    <div className="flex-1 flex flex-col gap-1" data-name="Container" data-node-id="1:69">
                      <div className="flex items-center gap-2" data-name="Container" data-node-id="1:70">
                        <div className="w-4 h-4" data-name="Icon" data-node-id="1:71">
                          <img alt="" className="w-full h-full" src={imgIcon4} />
                        </div>
                        <p className="text-base text-slate-100" data-name="Paragraph" data-node-id="1:75">
                          Contractor Validity Expired
                        </p>
                      </div>
                      <p className="text-base text-[#90a1b9]" data-name="Paragraph" data-node-id="1:77">
                        Authorization Check
                      </p>
                    </div>
                    <p className="text-base text-[#90a1b9]" data-name="Text" data-node-id="1:79">
                      1 hour ago
                    </p>
                  </div>
                </div>
              </div>

              {/* Three Column Cards */}
              <div className="grid grid-cols-3 gap-6" data-name="Container" data-node-id="1:81">
                {/* CVE Status Card */}
                <div className="bg-[#0f172b] border border-[#1d293d] rounded p-6 flex flex-col gap-6" data-name="Card" data-node-id="1:82">
                  <div className="flex items-center justify-between" data-name="CardHeader" data-node-id="1:83">
                    <div className="w-8 h-8" data-name="Icon" data-node-id="1:85">
                      <img alt="" className="w-full h-full" src={imgIcon5} />
                    </div>
                    <div className="bg-[rgba(130,24,26,0.6)] px-2.5 py-1 rounded text-xs font-medium text-white" data-name="Badge" data-node-id="1:87">
                      3 Active
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base text-slate-50 mb-1" data-name="CardTitle" data-node-id="1:89">
                      CVE Status
                    </h3>
                    <p className="text-base text-[#90a1b9]" data-name="CardDescription" data-node-id="1:91">
                      Vulnerability Impact Analysis
                    </p>
                  </div>
                  <div className="flex flex-col gap-2" data-name="AegisDashboard" data-node-id="1:93">
                    <div className="flex items-center justify-between" data-name="Container" data-node-id="1:94">
                      <p className="text-base text-[#90a1b9]" data-name="Text" data-node-id="1:95">
                        Active Critical CVEs
                      </p>
                      <p className="text-base text-[#fb2c36]" data-name="Text" data-node-id="1:97">
                        3
                      </p>
                    </div>
                    <div className="flex items-center justify-between" data-name="Container" data-node-id="1:99">
                      <p className="text-base text-[#90a1b9]" data-name="Text" data-node-id="1:100">
                        Impacted Devices
                      </p>
                      <p className="text-base text-[#ff6900]" data-name="Text" data-node-id="1:102">
                        127
                      </p>
                    </div>
                    <p className="text-base text-[#51a2ff] mt-2" data-name="Paragraph" data-node-id="1:104">
                      View Full Analysis →
                    </p>
                  </div>
                </div>

                {/* Inventory Snapshot Card */}
                <div className="bg-[#0f172b] border border-[#1d293d] rounded p-6 flex flex-col gap-6" data-name="Card" data-node-id="1:106">
                  <div className="flex items-center justify-between" data-name="CardHeader" data-node-id="1:107">
                    <div className="w-8 h-8" data-name="Icon" data-node-id="1:109">
                      <img alt="" className="w-full h-full" src={imgIcon6} />
                    </div>
                    <div className="bg-[#1d293d] px-2.5 py-1 rounded text-xs font-medium text-[#cad5e2]" data-name="Badge" data-node-id="1:113">
                      Live
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base text-slate-50 mb-1" data-name="CardTitle" data-node-id="1:115">
                      Inventory Snapshot
                    </h3>
                    <p className="text-base text-[#90a1b9]" data-name="CardDescription" data-node-id="1:117">
                      Auto-updating metrics
                    </p>
                  </div>
                  <div className="flex flex-col gap-4" data-name="AegisDashboard" data-node-id="1:119">
                    <div className="flex flex-col gap-1" data-name="Container" data-node-id="1:120">
                      <div className="flex items-center justify-between" data-name="Container" data-node-id="1:121">
                        <p className="text-base text-[#90a1b9]" data-name="Text" data-node-id="1:122">
                          Total Devices
                        </p>
                        <p className="text-base text-[#2b7fff]" data-name="Text" data-node-id="1:124">
                          1,847
                        </p>
                      </div>
                      <div className="flex items-center justify-between" data-name="Container" data-node-id="1:126">
                        <p className="text-base text-[#90a1b9]" data-name="Text" data-node-id="1:127">
                          Customers
                        </p>
                        <p className="text-base text-slate-100" data-name="Text" data-node-id="1:129">
                          42
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2" data-name="Container" data-node-id="1:131">
                      <div className="flex flex-col gap-1" data-name="Container" data-node-id="1:132">
                        <div className="flex items-center justify-between" data-name="Container" data-node-id="1:133">
                          <p className="text-base text-[#90a1b9]" data-name="Text" data-node-id="1:134">
                            v2.8.1
                          </p>
                          <p className="text-base text-slate-100" data-name="Text" data-node-id="1:136">
                            48.3%
                          </p>
                        </div>
                        <div className="bg-[rgba(250,250,250,0.2)] h-2 rounded-full overflow-hidden" data-name="Primitive.div" data-node-id="1:138">
                          <div className="bg-neutral-50 h-full" style={{ width: '48.3%' }} data-name="Container" data-node-id="1:139" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1" data-name="Container" data-node-id="1:140">
                        <div className="flex items-center justify-between" data-name="Container" data-node-id="1:141">
                          <p className="text-base text-[#90a1b9]" data-name="Text" data-node-id="1:142">
                            v2.7.5
                          </p>
                          <p className="text-base text-slate-100" data-name="Text" data-node-id="1:144">
                            35.4%
                          </p>
                        </div>
                        <div className="bg-[rgba(250,250,250,0.2)] h-2 rounded-full overflow-hidden" data-name="Primitive.div" data-node-id="1:146">
                          <div className="bg-neutral-50 h-full" style={{ width: '35.4%' }} data-name="Container" data-node-id="1:147" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1" data-name="Container" data-node-id="1:148">
                        <div className="flex items-center justify-between" data-name="Container" data-node-id="1:149">
                          <p className="text-base text-[#90a1b9]" data-name="Text" data-node-id="1:150">
                            v2.6.2
                          </p>
                          <p className="text-base text-slate-100" data-name="Text" data-node-id="1:152">
                            16.3%
                          </p>
                        </div>
                        <div className="bg-[rgba(250,250,250,0.2)] h-2 rounded-full overflow-hidden" data-name="Primitive.div" data-node-id="1:154">
                          <div className="bg-neutral-50 h-full" style={{ width: '16.3%' }} data-name="Container" data-node-id="1:155" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compliance Score Card */}
                <div className="bg-[#0f172b] border border-[#1d293d] rounded p-6 flex flex-col gap-6" data-name="Card" data-node-id="1:156">
                  <div className="flex items-center justify-between" data-name="CardHeader" data-node-id="1:157">
                    <div className="w-8 h-8" data-name="Icon" data-node-id="1:159">
                      <img alt="" className="w-full h-full" src={imgIcon7} />
                    </div>
                    <div className="bg-[#f0b100] px-2.5 py-1 rounded text-xs font-medium text-neutral-900" data-name="Badge" data-node-id="1:162">
                      87.5%
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base text-slate-50 mb-1" data-name="CardTitle" data-node-id="1:164">
                      Compliance Score
                    </h3>
                    <p className="text-base text-[#90a1b9]" data-name="CardDescription" data-node-id="1:166">
                      Regulatory compliance status
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2" data-name="AegisDashboard" data-node-id="1:168">
                    <div className="relative w-32 h-32" data-name="Container" data-node-id="1:169">
                      <img alt="" className="w-full h-full" src={imgIcon8} data-name="Icon" data-node-id="1:170" />
                      <div className="absolute inset-0 flex items-center justify-center" data-name="Text" data-node-id="1:173">
                        <p className="text-base text-[#00c950]" data-name="Text" data-node-id="1:174">
                          87.5%
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-center" data-name="Container" data-node-id="1:175">
                      <p className="text-base text-[#90a1b9]" data-name="Paragraph" data-node-id="1:176">
                        Devices 100% compliant with all regulatory constraints
                      </p>
                      <p className="text-base text-[#51a2ff]" data-name="Paragraph" data-node-id="1:178">
                        Generate Audit Report →
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Four Column Summary Cards */}
              <div className="grid grid-cols-4 gap-6" data-name="Container" data-node-id="1:180">
                <div className="bg-[#0f172b] border border-[#1d293d] rounded p-6 flex items-center justify-between" data-name="Card" data-node-id="1:181">
                  <div className="flex flex-col gap-2" data-name="AegisDashboard" data-node-id="1:182">
                    <p className="text-base text-[#90a1b9]" data-name="Paragraph" data-node-id="1:184">
                      Signed Firmware
                    </p>
                    <p className="text-base text-[#00c950]" data-name="Paragraph" data-node-id="1:186">
                      1,654
                    </p>
                  </div>
                  <div className="w-6 h-6" data-name="Icon" data-node-id="1:188">
                    <img alt="" className="w-full h-full" src={imgIcon9} />
                  </div>
                </div>
                <div className="bg-[#0f172b] border border-[#1d293d] rounded p-6 flex items-center justify-between" data-name="Card" data-node-id="1:191">
                  <div className="flex flex-col gap-2" data-name="AegisDashboard" data-node-id="1:192">
                    <p className="text-base text-[#90a1b9]" data-name="Paragraph" data-node-id="1:194">
                      Pending Approval
                    </p>
                    <p className="text-base text-[#f0b100]" data-name="Paragraph" data-node-id="1:196">
                      23
                    </p>
                  </div>
                  <div className="w-6 h-6" data-name="Icon" data-node-id="1:198">
                    <img alt="" className="w-full h-full" src={imgIcon10} />
                  </div>
                </div>
                <div className="bg-[#0f172b] border border-[#1d293d] rounded p-6 flex items-center justify-between" data-name="Card" data-node-id="1:200">
                  <div className="flex flex-col gap-2" data-name="AegisDashboard" data-node-id="1:201">
                    <p className="text-base text-[#90a1b9]" data-name="Paragraph" data-node-id="1:203">
                      Active Customers
                    </p>
                    <p className="text-base text-[#2b7fff]" data-name="Paragraph" data-node-id="1:205">
                      42
                    </p>
                  </div>
                  <div className="w-6 h-6" data-name="Icon" data-node-id="1:207">
                    <img alt="" className="w-full h-full" src={imgIcon11} />
                  </div>
                </div>
                <div className="bg-[#0f172b] border border-[#1d293d] rounded p-6 flex items-center justify-between" data-name="Card" data-node-id="1:212">
                  <div className="flex flex-col gap-2" data-name="AegisDashboard" data-node-id="1:213">
                    <p className="text-base text-[#90a1b9]" data-name="Paragraph" data-node-id="1:215">
                      Security Alerts
                    </p>
                    <p className="text-base text-[#fb2c36]" data-name="Paragraph" data-node-id="1:217">
                      1
                    </p>
                  </div>
                  <div className="w-6 h-6" data-name="Icon" data-node-id="1:219">
                    <img alt="" className="w-full h-full" src={imgIcon12} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-[226px] flex flex-col gap-4" data-name="Container" data-node-id="1:223">
              {/* Chain of Custody Card */}
              <div className="bg-[#0f172b] border-2 border-[rgba(173,70,255,0.5)] rounded p-6 flex flex-col gap-6" data-name="Card" data-node-id="1:224">
                <div className="flex flex-col gap-1" data-name="CardHeader" data-node-id="1:225">
                  <div className="flex items-center gap-2" data-name="ChainOfCustodySidebar" data-node-id="1:226">
                    <div className="w-5 h-5" data-name="Icon" data-node-id="1:227">
                      <img alt="" className="w-full h-full" src={imgIcon13} />
                    </div>
                    <h3 className="text-base text-slate-50" data-name="CardTitle" data-node-id="1:229">
                      Chain of Custody
                    </h3>
                  </div>
                  <p className="text-base text-[#90a1b9]" data-name="CardDescription" data-node-id="1:231">
                    Tamper-proof firmware lineage
                  </p>
                </div>
                <div className="flex flex-col gap-3" data-name="CardContent" data-node-id="1:233">
                  {/* Chain of Custody Items - Simplified for now */}
                  <div className="flex flex-col gap-3">
                    {/* HQ Creation */}
                    <div className="bg-[rgba(22,36,86,0.3)] border border-[rgba(43,127,255,0.4)] rounded p-3 flex flex-col gap-2">
                      <div className="flex items-start gap-2">
                        <div className="bg-[#0f172b] border border-[rgba(43,127,255,0.4)] rounded w-8 h-8 flex items-center justify-center">
                          <div className="w-4 h-4 relative">
                            <img alt="" className="w-full h-full" src={imgVector} />
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-[#51a2ff]">HQ Creation</p>
                            <div className="bg-[#00c950] w-6 h-6 rounded flex items-center justify-center">
                              <div className="w-3 h-3">
                                <img alt="" className="w-full h-full" src={imgIcon15} />
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-[#62748e]">2024-11-15 09:23:41 UTC</p>
                        </div>
                      </div>
                      <div className="bg-[rgba(29,41,61,0.5)] rounded p-2 flex flex-col gap-1">
                        <p className="text-xs text-[#62748e]">Identity</p>
                        <p className="text-xs text-[#cad5e2]">pkg.creator@hq.aegis.com</p>
                      </div>
                    </div>

                    {/* Testing & Approval */}
                    <div className="bg-[rgba(60,3,102,0.3)] border border-[rgba(173,70,255,0.4)] rounded p-3 flex flex-col gap-2">
                      <div className="flex items-start gap-2">
                        <div className="bg-[#0f172b] border border-[rgba(173,70,255,0.4)] rounded w-8 h-8 flex items-center justify-center">
                          <div className="w-4 h-4 relative">
                            <img alt="" className="w-full h-full" src={imgVector4} />
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-[#c27aff]">Testing & Approval</p>
                            <div className="bg-[#00c950] w-6 h-6 rounded flex items-center justify-center">
                              <div className="w-3 h-3">
                                <img alt="" className="w-full h-full" src={imgIcon15} />
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-[#62748e]">2024-11-15 14:45:22 UTC</p>
                        </div>
                      </div>
                      <div className="bg-[rgba(29,41,61,0.5)] rounded p-2 flex flex-col gap-1">
                        <p className="text-xs text-[#62748e]">Identity</p>
                        <p className="text-xs text-[#cad5e2]">qa.lead@hq.aegis.com</p>
                      </div>
                    </div>

                    {/* U.S. Signing */}
                    <div className="bg-[rgba(3,46,21,0.3)] border border-[rgba(0,201,80,0.4)] rounded p-3 flex flex-col gap-2">
                      <div className="flex items-start gap-2">
                        <div className="bg-[#0f172b] border border-[rgba(0,201,80,0.4)] rounded w-8 h-8 flex items-center justify-center">
                          <div className="w-4 h-4 relative">
                            <img alt="" className="w-full h-full" src={imgVector7} />
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-[#05df72]">U.S. Signing</p>
                            <div className="bg-[#00c950] w-6 h-6 rounded flex items-center justify-center">
                              <div className="w-3 h-3">
                                <img alt="" className="w-full h-full" src={imgIcon15} />
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-[#62748e]">2024-11-16 08:12:15 UTC</p>
                        </div>
                      </div>
                      <div className="bg-[rgba(29,41,61,0.5)] rounded p-2 flex flex-col gap-1">
                        <p className="text-xs text-[#62748e]">Identity</p>
                        <p className="text-xs text-[#cad5e2]">signing.authority@us.aegis.com</p>
                      </div>
                    </div>

                    {/* Deployment */}
                    <div className="bg-[rgba(0,44,34,0.3)] border border-[rgba(0,188,125,0.4)] rounded p-3 flex flex-col gap-2">
                      <div className="flex items-start gap-2">
                        <div className="bg-[#0f172b] border border-[rgba(0,188,125,0.4)] rounded w-8 h-8 flex items-center justify-center">
                          <div className="w-4 h-4 relative">
                            <img alt="" className="w-full h-full" src={imgVector9} />
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-[#00d492]">Deployment</p>
                            <div className="bg-[#00c950] w-6 h-6 rounded flex items-center justify-center">
                              <div className="w-3 h-3">
                                <img alt="" className="w-full h-full" src={imgIcon15} />
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-[#62748e]">2024-11-17 11:34:08 UTC</p>
                        </div>
                      </div>
                      <div className="bg-[rgba(29,41,61,0.5)] rounded p-2 flex flex-col gap-1">
                        <p className="text-xs text-[#62748e]">Identity</p>
                        <p className="text-xs text-[#cad5e2]">deploy.eng@customer.com</p>
                      </div>
                    </div>
                  </div>
                  <button className="bg-[#9810fa] text-white text-sm font-medium py-2 px-4 rounded flex items-center justify-center gap-2 mt-4" data-name="Button" data-node-id="1:234">
                    View Full Details
                    <div className="w-4 h-4" data-name="Icon" data-node-id="1:236">
                      <img alt="" className="w-full h-full" src={imgIcon14} />
                    </div>
                  </button>
                </div>
              </div>

              {/* Quick Access Card */}
              <div className="bg-[#0f172b] border border-[#1d293d] rounded p-6 flex flex-col gap-4" data-name="Card" data-node-id="1:336">
                <h3 className="text-base text-slate-50" data-name="CardTitle" data-node-id="1:337">
                  Quick Access
                </h3>
                <div className="flex flex-col gap-2" data-name="CardContent" data-node-id="1:339">
                  <button className="bg-neutral-50 text-neutral-900 text-sm font-medium py-2 px-3 rounded flex items-center gap-3" data-name="Button" data-node-id="1:340">
                    <div className="w-4 h-4" data-name="Icon" data-node-id="1:341">
                      <img alt="" className="w-full h-full" src={imgIcon16} />
                    </div>
                    Dashboard
                  </button>
                  <button className="bg-[rgba(38,38,38,0.3)] border border-neutral-800 text-neutral-50 text-sm font-medium py-2 px-3 rounded flex items-center gap-3" data-name="Button" data-node-id="1:344">
                    <div className="w-4 h-4" data-name="Icon" data-node-id="1:345">
                      <img alt="" className="w-full h-full" src={imgIcon17} />
                    </div>
                    Legacy Inventory
                  </button>
                  <button className="bg-[rgba(38,38,38,0.3)] border border-neutral-800 text-neutral-50 text-sm font-medium py-2 px-3 rounded flex items-center gap-3" data-name="Button" data-node-id="1:351">
                    <div className="w-4 h-4" data-name="Icon" data-node-id="1:352">
                      <img alt="" className="w-full h-full" src={imgIcon18} />
                    </div>
                    CVE Analysis
                  </button>
                  <button className="bg-[rgba(38,38,38,0.3)] border border-neutral-800 text-white text-sm font-medium py-2 px-3 rounded flex items-center gap-3" data-name="Button" data-node-id="1:357">
                    <div className="w-4 h-4" data-name="Icon" data-node-id="1:358">
                      <img alt="" className="w-full h-full" src={imgIcon19} />
                    </div>
                    Audit Reports
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

